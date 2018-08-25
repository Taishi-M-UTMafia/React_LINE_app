class Friendship < ActiveRecord::Base
  belongs_to :from_user, :class_name => 'User'
  belongs_to :to_user, :class_name => 'User'
  has_many :messages

  validates :friendship_id,{ presence: true }
  validates :friendship_id,{ uniqueness: true }

  # TODO: before_saveをつかって、friendship_idの生成を隠蔽する
  # after_find :test
  # #
  # def test
  #   if current_user.id > to_user_id.to_i
  #     self.friendship_id = "#{to_user_id.to_i}-#{current_user.id}"
  #   else
  #     self.friendship_id = "#{current_user.id}-#{to_user_id.to_i}"
  #   end
  # end
  # def riendship_id(to_user_id)
  #   if current_user.id > to_user_id.to_i
  #     self.friendship_id = "#{to_user_id.to_i}-#{current_user.id}"
  #   else
  #     self.friendship_id = "#{current_user.id}-#{to_user_id.to_i}"
  #   end
  # end

  def all_messages
    Message.where(friendship_id: self.id)
  end

end
