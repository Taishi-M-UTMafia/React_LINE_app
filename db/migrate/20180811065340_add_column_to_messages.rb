class AddColumnToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :friendship_id, :string
  end
end
