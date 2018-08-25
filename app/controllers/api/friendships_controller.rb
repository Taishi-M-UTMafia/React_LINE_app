module Api
  class FriendshipsController < ApplicationController
    def create
      # REVIEW(Sunny): friendship_idっていうのは本来model側が隠蔽すべきロジック。→そもそもFriendship_id生成しない
      if Friendship.create(from_user_id: current_user.id, to_user_id: params[:to_user_id])
        render json: {}
      end
    end

    def destroy_friendship
      friendship_id = friendship_id(params[:to_user_id])
      friendship_to_destroy = Friendship.find_by(friendship_id: friendship_id)
      if friendship_to_destroy.destroy
        render json: {}
      end
    end
  end
end
