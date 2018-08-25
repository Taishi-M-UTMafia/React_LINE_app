class Friendship < ActiveRecord::Base
  belongs_to :from_user, :class_name => 'User'
  belongs_to :to_user,   :class_name => 'User'
  has_many :messages

  # REVIEW(Sunny): before_saveをつかって、friendship_idの生成を隠蔽する→そもそも生成しない
  # TODO: where取得件数の制限？
  def all_messages
    Message.where(friendship_id: self.id)
  end
end
