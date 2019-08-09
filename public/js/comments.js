async function postComment(menu) {
	const content = $("#comment_form_" + menu)
		.val()
		.trim();
	if (content === "") {
		return alert("메세지를 입력해주세요");
	}

	requestPost(menu, content);
}

function appendCommentHtml(menu, content, postedAt) {
	const html = `<div class="comment">
            <div class="content">
            <a class="avatar">
              <img src="/img/user.png" />
            </a>
            <a class="author">익명 시용자</a>
            <div class="metadata">
                <span class="date">${postedAt}</span>
            </div>
            <div class="text">${content}</div>
          </div>
        </div>`;

	$("#comment_form_" + menu).val("");
	$(".comments_box_" + menu).append(html);
}

/**
 * @param {String} url
 * @param {Object} params
 * @returns responseText
 */
const sendPostAjax = (url, params) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status <= 210) {
				resolve(xhr.responseText);
			} else {
				reject({ status: xhr.status, message: xhr.responseText });
			}
		};
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(JSON.stringify(params));
		xhr.onerror = () => reject(req.status);
	});
};

function requestPost(menu, content) {
	sendPostAjax(`/reply/${menu}`, {
		content
	}).then(data => {
		const obj = JSON.parse(data);
		appendCommentHtml(menu, obj.content, obj.postedAt);
	});
}
