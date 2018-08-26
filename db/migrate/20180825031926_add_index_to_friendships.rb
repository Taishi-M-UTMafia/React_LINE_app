class AddIndexToFriendships < ActiveRecord::Migration
  def change
    add_index :friendships, [:from_user_id, :to_user_id], unique: true
  end
end
