class Friendship < ActiveRecord::Base
  belongs_to :from_user, :class_name => 'User'
  belongs_to :to_user,   :class_name => 'User'
  has_many :messages

  validates :chat_room_id, { presence: true }
  validates :chat_room_id, { uniqueness: true }

  def all_messages
    Message.where(chat_room_id: self.chat_room_id)
  end
end
