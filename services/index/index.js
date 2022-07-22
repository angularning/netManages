const images = [
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner2.png',
    text: '2',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png',
    text: '3',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner4.png',
    text: '4',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner5.png',
    text: '5',
  },
  {
    img: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner6.png',
    text: '6',
  },
];


/** 获取首页数据 */
export function fetchIndexBanner() {
  return Promise.resolve().then(() => {
    return {
      swiper: images,
    };
  });
}
export function fetchHomeList() {
  // if (config.useMock) {
  //   return mockFetchHome();
  // }
  return 'axios'
}