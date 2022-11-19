const checkAll = () => {
  const $items = document.querySelectorAll('health-check-item');
  $items.forEach($item => $item.click());
}

function render() {
  const $allCheckBtn = document.querySelector('#all-check-btn');
  $allCheckBtn.addEventListener('click', checkAll);

  window.$$data.items.forEach((v) => {
    const $list = document.querySelector('#health-check-list');
  
    const $item = document.createElement('health-check-item');
    $item.setAttribute('label', v.label ?? '');
    $item.setAttribute('url', v.url ?? '');
    $item.setAttribute('sites', v.sites?.join(',') ?? '');
  
    $list.appendChild($item);
  });
}


render();