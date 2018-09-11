class RemoveColumnFromMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :integer, :integer
  end
end
