// pages/index/infoDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlData: `<div class="markdown-body"><style>.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:16px;overflow-x:hidden;color:#333}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:24px;margin-bottom:5px}.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{font-size:20px}.markdown-body h2{padding-bottom:12px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:18px;padding-bottom:0}.markdown-body h6{margin-top:5px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}.markdown-body .contains-task-list{padding-left:0}.markdown-body .task-list-item{list-style:none}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}</style><h2 data-id="heading-0">前言</h2>
<p>接口性能问题，对于从事后端开发的同学来说，是一个绕不开的话题。想要优化一个接口的性能，需要从多个方面着手。</p>
<p>其实，我之前也写过一篇接口性能优化相关的文章《<a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzkwNjMwMTgzMQ%3D%3D%26mid%3D2247490731%26idx%3D1%26sn%3D29ed0295c7990157a3a56ba33cf7f8be%26chksm%3Dc0ebc443f79c4d55a2bac81744992c96f97737e5d0717ec99231f4d08f57a7f0220eafdac9c9%26token%3D660773166%26lang%3Dzh_CN%26scene%3D21%23wechat_redirect" target="_blank" rel="nofollow noopener noreferrer" title="https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&amp;mid=2247490731&amp;idx=1&amp;sn=29ed0295c7990157a3a56ba33cf7f8be&amp;chksm=c0ebc443f79c4d55a2bac81744992c96f97737e5d0717ec99231f4d08f57a7f0220eafdac9c9&amp;token=660773166&amp;lang=zh_CN&amp;scene=21#wechat_redirect" ref="nofollow noopener noreferrer">聊聊接口性能优化的11个小技巧</a>》，发表之后在全网广受好评，感兴趣的小伙们可以仔细看看。</p>
<p>本文将会接着接口性能优化这个话题，从实战的角度出发，聊聊我是如何优化一个慢查询接口的。</p>
<p>上周我优化了一下线上的批量评分查询接口，将接口性能从最初的<code>20s</code>，优化到目前的<code>500ms</code>以内。</p>
<p>总体来说，用三招就搞定了。</p>
<p>到底经历了什么？</p>
<h2 data-id="heading-1">1. 案发现场</h2>
<p>我们每天早上上班前，都会收到一封线上慢查询接口汇总邮件，邮件中会展示<code>接口地址</code>、<code>调用次数</code>、<code>最大耗时</code>、<code>平均耗时</code>和<code>traceId</code>等信息。</p>
<p>我看到其中有一个批量评分查询接口，最大耗时达到了<code>20s</code>，平均耗时也有<code>2s</code>。</p>
<p>用<code>skywalking</code>查看该接口的调用信息，发现绝大数情况下，该接口响应还是比较快的，大部分情况都是500ms左右就能返回，但也有少部分超过了20s的请求。</p>
<p>这个现象就非常奇怪了。</p>
<p>莫非跟数据有关？</p>
<p>比如：要查某一个组织的数据，是非常快的。但如果要查平台，即组织的根节点，这种情况下，需要查询的数据量非常大，接口响应就可能会非常慢。</p>
<p>但事实证明不是这个原因。</p>
<p>很快有个同事给出了答案。</p>
<p>他们在结算单列表页面中，批量请求了这个接口，但他传参的数据量非常大。</p>
<p>怎么回事呢？</p>
<p>当初说的需求是这个接口给分页的列表页面调用，每页大小有：10、20、30、50、100，用户可以选择。</p>
<p>换句话说，调用批量评价查询接口，一次性最多可以查询100条记录。</p>
<p>但实际情况是：结算单列表页面还包含了很多订单。基本上每一个结算单，都有多个订单。调用批量评价查询接口时，需要把结算单和订单的数据合并到一起。</p>
<p>这样导致的结果是：调用批量评价查询接口时，一次性传入的参数非常多，入参list中包含几百、甚至几千条数据都有可能。</p>
<h2 data-id="heading-2">2. 现状</h2>
<p>如果一次性传入几百或者几千个id，批量查询数据还好，可以走主键索引，查询效率也不至于太差。</p>
<p>但那个批量评分查询接口，逻辑不简单。</p>
<p>伪代码如下：</p>
<pre><code class="hljs language-java copyable" lang="java"><span class="hljs-keyword">public</span> List&lt;ScoreEntity&gt; <span class="hljs-title function_">query</span><span class="hljs-params">(List&lt;SearchEntity&gt; list)</span> {
    <span class="hljs-comment">//结果</span>
    List&lt;ScoreEntity&gt; result = Lists.newArrayList();
    <span class="hljs-comment">//获取组织id</span>
    List&lt;Long&gt; orgIds = list.stream().map(SearchEntity::getOrgId).collect(Collectors.toList());
    <span class="hljs-comment">//通过regin调用远程接口获取组织信息</span>
    List&lt;OrgEntity&gt; orgList = feginClient.getOrgByIds(orgIds);
    
    <span class="hljs-keyword">for</span>(SearchEntity entity : list) {
        <span class="hljs-comment">//通过组织id找组织code</span>
        <span class="hljs-type">String</span> <span class="hljs-variable">orgCode</span> <span class="hljs-operator">=</span> findOrgCode(orgList, entity.getOrgId());
    
        <span class="hljs-comment">//通过组合条件查询评价</span>
        <span class="hljs-type">ScoreSearchEntity</span> <span class="hljs-variable">scoreSearchEntity</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ScoreSearchEntity</span>();
        scoreSearchEntity.setOrgCode(orgCode);
        scoreSearchEntity.setCategoryId(entity.getCategoryId());
        scoreSearchEntity.setBusinessId(entity.getBusinessId());
        scoreSearchEntity.setBusinessType(entity.getBusinessType());
        List&lt;ScoreEntity&gt; resultList = scoreMapper.queryScore(scoreSearchEntity);
        
        <span class="hljs-keyword">if</span>(CollectionUtils.isNotEmpty(resultList)) {
            <span class="hljs-type">ScoreEntity</span> <span class="hljs-variable">scoreEntity</span> <span class="hljs-operator">=</span> resultList.get(<span class="hljs-number">0</span>);
            result.add(scoreEntity);
        }
    }
    <span class="hljs-keyword">return</span> result;
}
<span class="copy-code-btn">复制代码</span></code></pre>
<p>其实在真实场景中，代码比这个复杂很多，这里为了给大家演示，简化了一下。</p>
<p>最关键的地方有两点：</p>
<ol>
<li>在接口中远程调用了另外一个接口</li>
<li>需要在for循环中查询数据</li>
</ol>
<p>其中的第1点，即：在接口中远程调用了另外一个接口，这个代码是必须的。</p>
<p>因为如果在<code>评价表</code>中冗余一个组织code字段，万一哪天<code>组织表</code>中的组织code有修改，不得不通过某种机制，通知我们同步修改评价表的组织code，不然就会出现数据不一致的问题。</p>
<p>很显然，如果要这样调整的话，业务流程上要改了，代码改动有点大。</p>
<p>所以，还是先保持在接口中远程调用吧。</p>
<p>这样看来，可以优化的地方只能在：for循环中查询数据。</p>
<h2 data-id="heading-3">3. 第一次优化</h2>
<p>由于需要在for循环中，每条记录都要根据不同的条件，查询出想要的数据。</p>
<p>由于业务系统调用这个接口时，没有传<code>id</code>，不好在<code>where</code>条件中用<code>id in (...)</code>，这方式批量查询数据。</p>
<p>其实，有一种办法不用循环查询，一条sql就能搞定需求：使用<code>or</code>关键字拼接，例如：(org_code='001' and category_id=123 and business_id=111 and business_type=1) <code>or</code> (org_code='002' and category_id=123 and business_id=112 and business_type=2) <code>or</code> (org_code='003' and category_id=124 and business_id=117 and business_type=1)...</p>
<p>这种方式会导致sql语句会非常长，性能也会很差。</p>
<p>其实还有一种写法：</p>
<pre><code class="hljs language-sql copyable" lang="sql"><span class="hljs-keyword">where</span> (a,b) <span class="hljs-keyword">in</span> ((<span class="hljs-number">1</span>,<span class="hljs-number">2</span>),(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>)...)
<span class="copy-code-btn">复制代码</span></code></pre>
<p>不过这种sql，如果一次性查询的数据量太多的话，性能也不太好。</p>
<p>居然没法改成批量查询，就只能优化单条查询sql的执行效率了。</p>
<p>首先从<code>索引</code>入手，因为改造成本最低。</p>
<blockquote>
<p>第一次优化是<code>优化索引</code>。</p>
</blockquote>
<p>评价表之前建立一个business_id字段的<code>普通索引</code>，但是从目前来看效率不太理想。</p>
<p>由于我果断的加了<code>联合索引</code>：</p>
<pre><code class="hljs language-sql copyable" lang="sql"><span class="hljs-keyword">alter</span> <span class="hljs-keyword">table</span> user_score <span class="hljs-keyword">add</span> index  <span class="hljs-keyword">USING</span> BTREE;
<span class="copy-code-btn">复制代码</span></code></pre>
<p>该联合索引由：<code>org_code</code>、<code>category_id</code>、<code>business_id</code>和<code>business_type</code>四个字段组成。</p>
<p>经过这次优化，效果立竿见影。</p>
<p>批量评价查询接口最大耗时，从最初的<code>20s</code>，缩短到了<code>5s</code>左右。</p>
<h2 data-id="heading-4">4. 第二次优化</h2>
<p>由于需要在for循环中，每条记录都要根据不同的条件，查询出想要的数据。</p>
<p>只在一个线程中查询数据，显然太慢。</p>
<p>那么，为何不能改成多线程调用？</p>
<blockquote>
<p>第二次优化，查询数据库由<code>单线程</code>改成<code>多线程</code>。</p>
</blockquote>
<p>但由于该接口是要将查询出的所有数据，都返回回去的，所以要获取查询结果。</p>
<p>使用多线程调用，并且要获取返回值，这种场景使用java8中的<code>CompleteFuture</code>非常合适。</p>
<p>代码调整为：</p>
<pre><code class="hljs language-java copyable" lang="java">CompletableFuture[] futureArray = dataList.stream()
     .map(data -&gt; CompletableFuture
          .supplyAsync(() -&gt; query(data), asyncExecutor)
          .whenComplete((result, th) -&gt; {
       })).toArray(CompletableFuture[]::<span class="hljs-keyword">new</span>);
CompletableFuture.allOf(futureArray).join();
<span class="copy-code-btn">复制代码</span></code></pre>
<p><code>CompleteFuture</code>的本质是创建<code>线程</code>执行，为了避免产生太多的线程，所以使用<code>线程池</code>是非常有必要的。</p>
<p>优先推荐使用<code>ThreadPoolExecutor</code>类，我们自定义线程池。</p>
<p>具体代码如下：</p>
<pre><code class="hljs language-java copyable" lang="java"><span class="hljs-type">ExecutorService</span> <span class="hljs-variable">threadPool</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ThreadPoolExecutor</span>(
    <span class="hljs-number">8</span>, <span class="hljs-comment">//corePoolSize线程池中核心线程数</span>
    <span class="hljs-number">10</span>, <span class="hljs-comment">//maximumPoolSize 线程池中最大线程数</span>
    <span class="hljs-number">60</span>, <span class="hljs-comment">//线程池中线程的最大空闲时间，超过这个时间空闲线程将被回收</span>
    TimeUnit.SECONDS,<span class="hljs-comment">//时间单位</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayBlockingQueue</span>(<span class="hljs-number">500</span>), <span class="hljs-comment">//队列</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ThreadPoolExecutor</span>.CallerRunsPolicy()); <span class="hljs-comment">//拒绝策略</span>
<span class="copy-code-btn">复制代码</span></code></pre>
<p>也可以使用<code>ThreadPoolTaskExecutor</code>类创建线程池：</p>
<pre><code class="hljs language-java copyable" lang="java"><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ThreadPoolConfig</span> {

    <span class="hljs-comment">/**
     * 核心线程数量，默认1
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">int</span> <span class="hljs-variable">corePoolSize</span> <span class="hljs-operator">=</span> <span class="hljs-number">8</span>;

    <span class="hljs-comment">/**
     * 最大线程数量，默认Integer.MAX_VALUE;
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">int</span> <span class="hljs-variable">maxPoolSize</span> <span class="hljs-operator">=</span> <span class="hljs-number">10</span>;

    <span class="hljs-comment">/**
     * 空闲线程存活时间
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">int</span> <span class="hljs-variable">keepAliveSeconds</span> <span class="hljs-operator">=</span> <span class="hljs-number">60</span>;

    <span class="hljs-comment">/**
     * 线程阻塞队列容量,默认Integer.MAX_VALUE
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">int</span> <span class="hljs-variable">queueCapacity</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>;

    <span class="hljs-comment">/**
     * 是否允许核心线程超时
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">boolean</span> <span class="hljs-variable">allowCoreThreadTimeOut</span> <span class="hljs-operator">=</span> <span class="hljs-literal">false</span>;


    <span class="hljs-meta">@Bean("asyncExecutor")</span>
    <span class="hljs-keyword">public</span> Executor <span class="hljs-title function_">asyncExecutor</span><span class="hljs-params">()</span> {
        <span class="hljs-type">ThreadPoolTaskExecutor</span> <span class="hljs-variable">executor</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ThreadPoolTaskExecutor</span>();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setKeepAliveSeconds(keepAliveSeconds);
        executor.setAllowCoreThreadTimeOut(allowCoreThreadTimeOut);
        <span class="hljs-comment">// 设置拒绝策略，直接在execute方法的调用线程中运行被拒绝的任务</span>
        executor.setRejectedExecutionHandler(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ThreadPoolExecutor</span>.CallerRunsPolicy());
        <span class="hljs-comment">// 执行初始化</span>
        executor.initialize();
        <span class="hljs-keyword">return</span> executor;
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>
<p>经过这次优化，接口性能也提升了5倍。</p>
<p>从<code>5s</code>左右，缩短到<code>1s</code>左右。</p>
<p>但整体效果还不太理想。</p>
<h2 data-id="heading-5">5. 第三次优化</h2>
<p>经过前面的两次优化，批量查询评价接口性能有一些提升，但耗时还是大于1s。</p>
<p>出现这个问题的根本原因是：<code>一次性查询的数据太多</code>。</p>
<p>那么，我们为什么不限制一下，每次查询的记录条数呢？</p>
<blockquote>
<p>第三次优化，限制一次性查询的记录条数。其实之前也做了限制，不过最大是2000条记录，从目前看效果不好。</p>
</blockquote>
<p>限制该接口一次只能查<code>200</code>条记录，如果超过<code>200</code>条则会报错提示。</p>
<p>如果直接对该接口做限制，则可能会导致业务系统出现异常。</p>
<p>为了避免这种情况的发生，必须跟业务系统团队一起讨论一下优化方案。</p>
<p>主要有下面两个方案：</p>
<h3 data-id="heading-6">5.1 前端做分页</h3>
<p>在结算单列表页中，每个结算单默认只展示1个订单，多余的分页查询。</p>
<p>这样的话，如果按照每页最大100条记录计算的话，结算单和订单最多一次只能查询200条记录。</p>
<p>这就需要业务系统的前端做<code>分页功能</code>，同时后端接口要调整支持<code>分页查询</code>。</p>
<p>但目前现状是前端没有多余开发资源。</p>
<p>由于人手不足的原因，这套方案目前只能暂时搁置。</p>
<h3 data-id="heading-7">5.2 分批调用接口</h3>
<p>业务系统后端之前是<code>一次性</code>调用评价查询接口，现在改成<code>分批</code>调用。</p>
<p>比如：之前查询500条记录，业务系统只调用一次查询接口。</p>
<p>现在改成业务系统每次只查100条记录，分5批调用，总共也是查询500条记录。</p>
<p>这样不是变慢了吗？</p>
<p>答：如果那5批调用评价查询接口的操作，是在for循环中单线程顺序的，整体耗时当然可能会变慢。</p>
<p>但业务系统也可以改成<code>多线程</code>调用，只需最终汇总结果即可。</p>
<p>此时，有人可能会问题：在评价查询接口的服务器多线程调用，跟在其他业务系统中多线程调用不是一回事？</p>
<p>还不如把批量评价查询接口的服务器中，<code>线程池</code>的<code>最大线程数</code>调大一点？</p>
<p>显然你忽略了一件事：线上应用一般不会被部署成单点。绝大多数情况下，为了避免因为服务器挂了，造成单点故障，基本会部署至少2个节点。这样即使一个节点挂了，整个应用也能正常访问。</p>
<blockquote>
<p>当然也可能会出现这种情况：假如挂了一个节点，另外一个节点可能因为访问的流量太大了，扛不住压力，也可能因此挂掉。</p>
</blockquote>
<p>换句话说，通过业务系统中的多线程调用接口，可以将访问接口的流量负载均衡到不同的节点上。</p>
<p>他们也用8个线程，将数据分批，每批100条记录，最后将结果汇总。</p>
<p>经过这次优化，接口性能再次提升了1倍。</p>
<p>从<code>1s</code>左右，缩短到小于<code>500ms</code>。</p>
<p>温馨提醒一下，无论是在批量查询评价接口查询数据库，还是在业务系统中调用批量查询评价接口，使用多线程调用，都只是一个临时方案，并不完美。</p>
<p>这样做的原因主要是为了先快速解决问题，因为这种方案改动是最小的。</p>
<p>要从根本上解决问题，需要重新设计这一套功能，需要修改表结构，甚至可能需要修改业务流程。但由于牵涉到多条业务线，多个业务系统，只能排期慢慢做了。</p>
<p>如果你想了解更多接口优化的小技巧，可以看看我的另一篇文章《<a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzkwNjMwMTgzMQ%3D%3D%26mid%3D2247490731%26idx%3D1%26sn%3D29ed0295c7990157a3a56ba33cf7f8be%26chksm%3Dc0ebc443f79c4d55a2bac81744992c96f97737e5d0717ec99231f4d08f57a7f0220eafdac9c9%26token%3D660773166%26lang%3Dzh_CN%26scene%3D21%23wechat_redirect" target="_blank" rel="nofollow noopener noreferrer" title="https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&amp;mid=2247490731&amp;idx=1&amp;sn=29ed0295c7990157a3a56ba33cf7f8be&amp;chksm=c0ebc443f79c4d55a2bac81744992c96f97737e5d0717ec99231f4d08f57a7f0220eafdac9c9&amp;token=660773166&amp;lang=zh_CN&amp;scene=21#wechat_redirect" ref="nofollow noopener noreferrer">聊聊接口性能优化的11个小技巧</a>》。</p>
<h2 data-id="heading-8">最后说一句(求关注，别白嫖我)</h2>
<p>如果这篇文章对您有所帮助，或者有所启发的话，帮忙扫描下发二维码关注一下，您的支持是我坚持写作最大的动力。</p>
<p>求一键三连：点赞、转发、在看。</p>
<p>关注公众号：【苏三说技术】，在公众号中回复：面试、代码神器、开发手册、时间管理有超赞的粉丝福利，另外回复：加群，可以跟很多BAT大厂的前辈交流和学习。</p><style>.markdown-body pre,.markdown-body pre>code.hljs{color:#333;background:#f8f8f8}.hljs-comment,.hljs-quote{color:#998;font-style:italic}.hljs-keyword,.hljs-selector-tag,.hljs-subst{color:#333;font-weight:700}.hljs-literal,.hljs-number,.hljs-tag .hljs-attr,.hljs-template-variable,.hljs-variable{color:teal}.hljs-doctag,.hljs-string{color:#d14}.hljs-section,.hljs-selector-id,.hljs-title{color:#900;font-weight:700}.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type{color:#458;font-weight:700}.hljs-attribute,.hljs-name,.hljs-tag{color:navy;font-weight:400}.hljs-link,.hljs-regexp{color:#009926}.hljs-bullet,.hljs-symbol{color:#990073}.hljs-built_in,.hljs-builtin-name{color:#0086b3}.hljs-meta{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}</style></div>`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const data = JSON.parse(options.data)
    wx.setNavigationBarTitle({
      title: data.title,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})