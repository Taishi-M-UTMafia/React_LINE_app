class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :content
      t.integer :from_user_id
      t.integer :to_user_id

      t.timestamps null: false
    end
  end
end
