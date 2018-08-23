class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :friendship

  validates :content, presence: true, length: {maximum: 50}
  validates :from_user_id, presence: true
  validates :friendship_id, presence: true
  validates :message_type, presence: true

  # TODO: message_typeをenumにする
end
