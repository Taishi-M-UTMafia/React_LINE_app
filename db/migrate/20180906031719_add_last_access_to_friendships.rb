class AddLastAccessToFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :from_user_last_access, :integer
    add_column :friendships, :to_user_last_access, :integer
  end
end
