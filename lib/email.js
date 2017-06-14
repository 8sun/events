module.exports.comment = function(item, event_id, domain, sunUrl, from) {

    const {
      email,
      name,
      comment
    } = item

return `
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<table style="width: 320px; margin: 0 auto; border-collapse: collapse; font-family: sans-serif" cellpadding="0">
		<tr>
			<td>
				<div style="background-color: #ff6b00; width: 316px; height: 69px; border: 2px solid #ff6b00; border-radius: 10px 10px 0 0; text-align: center">
					<a href="" style="line-height: 69px"><img src="${domain}/assets/img/events.png" style="line-height: 69px; vertical-align: middle;"></a>
				</div>
			</td>
		</tr>
		<tr>
			<td style="border-collapse: collapse">
				<div style="width: 316px; border: 2px solid #ff6b00; border-bottom: none; text-align: center; padding-bottom: 27px">
					<p style="font-size: 30px; line-height: 1.2; text-align: center; margin-top: 20px; margin-bottom: 15px">Hello, ${name}</p>
					<p style="font-size: 14px; line-height: 1.5; text-align: center; width: 265px; height: 55px;margin: 0 auto">
					The event you subscribed for has receive a new comment: </p>
					<p style="font-size: 14px; line-height: 1.5; text-align: center; width: 275px; height: 65px;margin-left: auto; margin-right: auto; margin-bottom: 110px;">
					${comment}</p>
					<p>From: ${from}</p>
					<a href="${domain}/event/${event_id}" style="font-family: sans-serif; font-size: 14px; color: rgb(65, 131, 196); line-height: 1.5; text-align: center; text-decoration: none;">
					Go to the event</a>
				</div>
			</td>
		</tr>
		<tr>
			<td style="border-collapse: collapse">
				<div style="width: 320px; height: 55px; text-align: center; background-color: rgb(43, 45, 43); border-radius: 0 0 10px 10px">	
					<a href="${sunUrl}" style="font-family: sans-serif; font-size: 14px; color: rgb(242, 107, 0);; line-height: 55px; text-align: center; text-decoration: none;">
					Created by 8sun Empire</a>
				</div>
			</td>
		</tr>
	</table>
</body>
</html>
`
}

module.exports.subscribe = function(item, event_id, domain, sunUrl, from) {

    const {
      email,
      name,
    } = item

return `
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<table style="width: 320px; margin: 0 auto; border-collapse: collapse; font-family: sans-serif" cellpadding="0">
		<tr>
			<td>
				<div style="background-color: #ff6b00; width: 316px; height: 69px; border: 2px solid #ff6b00; border-radius: 10px 10px 0 0; text-align: center">
					<a href="" style="line-height: 69px"><img src="${domain}/assets/img/events.png" style="line-height: 69px; vertical-align: middle;"></a>
				</div>
			</td>
		</tr>
		<tr>
			<td style="border-collapse: collapse">
				<div style="width: 316px; border: 2px solid #ff6b00; border-bottom: none; text-align: center; padding-bottom: 27px">
					<p style="font-size: 30px; line-height: 1.2; text-align: center; margin-top: 20px; margin-bottom: 15px">Hello, ${name}</p>
					<p style="font-size: 14px; line-height: 1.5; text-align: center; width: 265px; height: 55px;margin: 0 auto"></p>
					<p style="font-size: 14px; line-height: 1.5; text-align: center; width: 275px; height: 65px;margin-left: auto; margin-right: auto; margin-bottom: 110px;">
						On the event that you subscribed for, user ${from} has been subscribed. 
					</p>
					<a href="${domain}/event/${event_id}" style="font-family: sans-serif; font-size: 14px; color: rgb(65, 131, 196); line-height: 1.5; text-align: center; text-decoration: none;">
					Go to the event</a>
				</div>
			</td>
		</tr>
		<tr>
			<td style="border-collapse: collapse">
				<div style="width: 320px; height: 55px; text-align: center; background-color: rgb(43, 45, 43); border-radius: 0 0 10px 10px">	
					<a href="${sunUrl}" style="font-family: sans-serif; font-size: 14px; color: rgb(242, 107, 0);; line-height: 55px; text-align: center; text-decoration: none;">
					Created by 8sun Empire</a>
				</div>
			</td>
		</tr>
	</table>
</body>
</html>
`
}