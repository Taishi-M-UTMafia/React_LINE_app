class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :friendship

  validates :content, presence: true, length: {maximum: 50}
end
