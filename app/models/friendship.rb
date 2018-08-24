class Friendship < ActiveRecord::Base
  belongs_to :from_user, :class_name => 'User'
  belongs_to :to_user, :class_name => 'User'
  has_many :messages, :dependent => :destroy

  validates :friendship_id,{ presence: true }
  validates :friendship_id,{ uniqueness: true }

  # TODO: before_saveをつかって、friendship_idの生成を隠蔽する
  # before_save :set_friendship_id
  #
  # def return_friendship_id(to_user_id)
  #   if current_user.id > to_user_id.to_i
  #     "#{to_user_id.to_i}-#{current_user.id}"
  #   else
  #     "#{current_user.id}-#{to_user_id.to_i}"
  #   end
  # end

end
