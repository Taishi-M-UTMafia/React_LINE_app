module Api
  class FriendshipsController < ApplicationController

    def create
      # TODO: friendship_idっていうのは本来model側が隠蔽すべきロジック。適当なStringを代入するとバグが起きるからね
      @friendship_id=set_friendship_id(params[:to_user_id])
      @friendship= Friendship.new(from_user_id: current_user.id, to_user_id:params[:to_user_id],
                                  friendship_id: @friendship_id)
      if @friendship.save
        render json: {}
      end
    end

    def destroy_friend
      @friendship_id=set_friendship_id(params[:to_user_id])
      @friendship=Friendship.find_by(friendship_id: @friendship_id)
      if @friendship.destroy
        render json: {}
      end
    end
  end

end
