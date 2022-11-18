const items = [
  {
    label: '해줌닷컴',
    url: 'https://haezoom.com',
    sites: [
      'https://devel.haezoom.com/',
      'https://www.haezoom.com/admin/'
    ]
  },
  {
    label: '고객용 vpp',
    url: 'https://vpp.haezoom.com',
    sites: [
      'https://vppdev.haezoom.com',
    ]
  },
  {
    label: '해줌용 VPP',
    url: 'https://vppmaster.haezoom.com',
    sites: [
      'https://vppmasterdev.haezoom.com/',
    ]
  },
  {
    label: '해줌R',
    url: 'https://re100.haezoom.com',
    sites: [
      '',
    ]
  },
  {
    label: '내일의 발전',
    url: 'https://tomorrow.haezoom.com',
    sites: [
      'https://fedoradev.haezoom.com/index',
    ]
  },
  {
    label: '비즈 해줌',
    url: 'https://biz.haezoom.com/',
    sites: [
      'https://bizdev.haezoom.com/',
    ] 
  },
  {
    label: '해줌온',
    url: 'https://curoo.haezoomon.com/',
    sites: [
      '',
    ],
  },
  {
    label: '해줌홈',
    url: 'https://home.haezoom.com',
    sites: [
      '',
    ]
  }
];

const checkAll = () => {
  const $items = document.querySelectorAll('health-check-item');
  $items.forEach($item => $item.click());
}

function render() {
  const $allCheckBtn = document.querySelector('#all-check-btn');
  $allCheckBtn.addEventListener('click', checkAll);

  items.forEach((v) => {
    const $list = document.querySelector('#health-check-list');
  
    const $item = document.createElement('health-check-item');
    $item.setAttribute('label', v.label);
    $item.setAttribute('url', v.url);
    $item.setAttribute('sites', v.sites.join(','),);
  
    $list.appendChild($item);
  });
}


render();