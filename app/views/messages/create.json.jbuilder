json.body @message.body
json.image @message.image.url
json.datetime @message.created_at.to_s
json.name @message.user.name
json.id @message.id