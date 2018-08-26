class RemoveColumnFromFriendships < ActiveRecord::Migration
  def change
    remove_column :friendships, :friendship_id, :string
  end
end
