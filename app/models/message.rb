class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :friendship

  validates :content,       presence: true, length: { maximum: 50 }
  validates :from_user_id,  presence: true
  validates :friendship_id, presence: true
  validates :message_type,  presence: true

  # TODO(Sunny): message_typeをenumにする。modelに格納する値を制限できる。
  #　　　　　　　　　数字に対応させてmodeにinteger型で保存するのがベタだけどそれは今度から
  enum message_type: { text: 'text', image: 'image' }

end
