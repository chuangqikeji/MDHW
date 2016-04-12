import { $, $parent, $cookie } from 'func';
import render from 'render';
import showMenu from 'showMenu';


export default function comment() {
  showMenu();
  function template(data) {
    return data.result.data.reduce((pre, cur) => {
      const child = cur.child.reduce((_pre, _cur) => (
        `${_pre}<li class="dialog_sublist_item">
          <div class="dialog_sublist_item_username">${_cur.user}</div>
          <div class="dialog_sublist_item_comment">
            <i class="dialog_sublist_item_arrow"></i>
            <p class="dialog_sublist_item_content">${_cur.comment}</p>
            <p class="dialog_list_item_info_time"><time>${_cur.date}</time></p>
          </div>
        </li>`
      ), '');
      return `${pre}<li class="dialog_list_item">
          <div class="dialog_list_item_user">
            <img class="dialog_list_item_user_avatar" src="#" alt="${cur.user}" />
            <span class="dialog_list_item_user_name">${cur.user}</span>
          </div>
          <p class="dialog_list_item_content">${cur.comment}</p>
          <div class="dialog_list_item_info">
            <time class="dialog_list_item_info_time"><i class="fa fa-clock-o"></i>${cur.date}</time>
            <button class="dialog_list_item_info_btn" type="button"><i class="fa fa-commenting-o"></i>评论</button>
          </div>
          <!--子评论 开始-->
          <ul class="dialog_sublist" ${child.length ? '' : 'style="visibility:hidden"'}>
            ${child.length ? `<li class="dialog_sublist_arrow"></li>${child}` : ''}
          </ul>
        </li>`;
    }, '');
  }
  let load = document.querySelector('.list_load');
  render({
    template,
    load,
    api: '/m/ZC/Comments',
    params: {
      fpid: 167,
      pageIndex: 1,
      pageSize: 10
    },
    container: $('.dialog_list')
  });

  function mainComment() {
    const replyName = $('.reply_box_name');
    const replyInput = $('.replay_box_input');

    const commentList = $('.dialog_list');
    let subCommentList;

    let replyComment;
    let subComment;
    let replyId;
    commentList.addEventListener('click', (e) => {
      if (!e.target.classList.contains('dialog_list_item_info_btn')) return;
      if (e.target.classList.contains('sub')) {
        // 获取子评论id
        // subComment = $parent(e.target, '.dialog_sublist');
        subComment = $parent(e.target, '.sub_item');
        console.log(subComment);
        replyId = subComment.getAttribute('code-id');
      } else {
        // 获取主评论id
        replyComment = $parent(e.target, '.dialog_list_item');
        replyId = replyComment.getAttribute('code-id');
      }

      const userName = replyComment.querySelector('.dialog_list_item_user_name').textContent;
      replyName.textContent = `@${userName}:`;
      replyName.classList.remove('is-hidden');
      let width = replyName.offsetWidth;
      replyInput.focus();
      replyInput.classList.add('is-focus');
      replyInput.style.paddingLeft = `${14 + width}px`;
      replyInput.value = '';
    });

    // 发表评论
    $('.reply_btn').addEventListener('click', () => {
      if (replyInput.value === '') return;
      const isRootComment = replyName.classList.contains('is-hidden');

      const user = $cookie().name;
      const comment = replyInput.value;
      const dt = new Date();
      const date = dt.toISOString().slice(0, -5).replace(/T/, ' ');
      let proPath = window.location.pathname;
      let array = proPath.split('/');
      if (isRootComment) {
        const html = template({ result: { data: [{ comment, date, user, child: [] }] } });
        commentList.insertAdjacentHTML('beforeEnd', html);
        document.body.scrollTop = commentList.lastElementChild.offsetTop;
      } else {
        const html = `<li class="dialog_sublist_item sub_item">
          <div class="dialog_sublist_item_username">${user}</div>
          <div class="dialog_sublist_item_comment">
            <i class="dialog_sublist_item_arrow"></i>
            <p class="dialog_sublist_item_content">${comment}</p>
            <p class="dialog_list_item_info_time"><time class="sub_time">${date}</time><button class="dialog_list_item_info_btn sub" type="button">回复</button></p>
          </div>
        </li>`;

        subCommentList = replyComment.querySelector('.dialog_sublist');
        subCommentList.style.visibility = 'visible';
        subCommentList.insertAdjacentHTML('beforeEnd', html);
        document.body.scrollTop = replyComment.querySelector('.dialog_sublist').lastElementChild.offsetTop + 1000;
      }
      let params = {
        fpid: array[4],
        fid: isRootComment ? 0 : replyId, // 临时
        comment,
        type: 0
      };

      replyInput.value = '';

      fetch('/m/ZC/FbComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            (isRootComment ? commentList : subCommentList)
              .lastElementChild.setAttribute('code-id', data.result.id);
          } else {
            alert('对不起，评论发布失败!');
          }
        });
    });

    function keyDel() {
      if (replyName.classList.contains('is-hidden')) return;
      replyName.classList.add('is-hidden');
      $('#replay').style.paddingLeft = '14px';
    }
    $('#replay').addEventListener('keyup', e => {
      if (e.keyCode === 8) {
        keyDel();
      }
    });
  }
  mainComment();
}
