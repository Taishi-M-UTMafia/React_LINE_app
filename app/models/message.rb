class Message < ActiveRecord::Base
  belongs_to :user

  validates :content, presence: true, length: {maximum: 50}
end
