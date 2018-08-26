class AddColumnToFriendhips < ActiveRecord::Migration
  def change
    add_column :friendships, :chat_room_id, :string
  end
end
