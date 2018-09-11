class RenameColumnInMessages < ActiveRecord::Migration
  def change
    rename_column :messages, :from_user_id, :user_id
    rename_column :messages, :to_user_id, :integer
  end
end
