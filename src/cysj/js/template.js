export default function template(data) {
  return data.result.data.reduce((pre, cur) => (
    `${pre}<li class="hostlist_item">
      <div class="hostlist_item_img">
        <div style="width:60px;height:60px;background:red"></div>
      </div>
      <div class="hostlist_content">
        <div class="base_title_wrap">
          <h2 class="base_title_text base_title_text-small"><span class="base_title_wrap_label">[${cur.state}]</span>${cur.title}</h2>
          <span class="base_title_tag">${cur.type}</span>
        </div>
        <div class="hostlist_item_info">
          <div class="hostlist_item_info_item">
            ${cur.count}<span class="hostlist_item_info_item_label">人参与</span> | <span class="hostlist_item_info_item_label">交付周期：</span>${cur.xmzq}天
          </div>
          <div class="hostlist_item_info_item hostlist_item_info_item-em">
            ￥<strong>${cur.money}</strong>
          </div>
        </div>
      </div>
    </li>`
  ), '');
}