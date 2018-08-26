class RenameColumnOfMessages < ActiveRecord::Migration
  def change
    rename_column :messages, :friendship_id, :chat_room_id
  end
end
