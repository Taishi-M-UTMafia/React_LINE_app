module Api
  class FriendshipsController < ApplicationController

    def create
      # TODO(Sunny): friendship_idっていうのは本来model側が隠蔽すべきロジック。
      #               メソッドをモデル内に作ってここではto_user.friendship_idとかにして可読性を上げる
      @friendship_id= return_friendship_id(params[:to_user_id])
      @friendship= Friendship.new(from_user_id: current_user.id, to_user_id:params[:to_user_id],
                                  friendship_id: @friendship_id)
      if @friendship.save
        render json: {}
      end
    end

    def destroy_friend
      @friendship_id=return_friendship_id(params[:to_user_id])
      @friendship=Friendship.find_by(friendship_id: @friendship_id)
      if @friendship.destroy
        render json: {}
      end
    end
  end

end
