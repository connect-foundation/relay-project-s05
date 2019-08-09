function postComment(menu) {
	const content = $("#comment_form").val();
	appendCommentHtml(content);
}

function appendCommentHtml(content) {
	const html = `<div class="comment">
        <a class="avatar">
            <img src="/img/user.png" />
        </a>
        <div class="content">
            <a class="author">익명 시용자</a>
            <div class="metadata">
                <span class="date">지금</span>
            </div>
            <div class="text">${content}</div>
        </div>
        </div>`;

	$("#comment_form").val("");
	$(".comments_box").append(html);
}
