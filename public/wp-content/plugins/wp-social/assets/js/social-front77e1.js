
function xs_social_sharer(ev) {

	let pid = ev.getAttribute('data-pid');
	let key = ev.getAttribute('data-key');
	let hash = ev.getAttribute('data-uri_hash');
	let link = ev.getAttribute('data-xs-href');


	window.open(link, 'xs_feed_sharer', 'width=626,height=436');

	let values = {
		'pid': pid,
		'hash': hash,
		'social': key
	};

	jQuery.ajax({
		data: values,
		type: 'post',
		url: window.rest_api_conf.root + 'wp_social/v1/shared/url',
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-WP-Nonce', window.rest_api_conf.nonce);
		},
		success: function(result) {
		},
		error: function(data) {
		}
	});
}

