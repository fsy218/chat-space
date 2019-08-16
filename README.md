# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :massages
- has_many :groups_users
- has_many :groups, through: groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :massages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|text||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
