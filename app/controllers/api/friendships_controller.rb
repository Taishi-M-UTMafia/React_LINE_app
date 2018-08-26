module Api
  class FriendshipsController < ApplicationController
    def create
      # TODO(Sunny): friendship_idっていうのは本来model側が隠蔽すべきロジック。
      # chat_room_idは友達関係の一意性を担保するための、from_user_idとto_user_idの組み合わせ(小さい順)。
      if Friendship.create(from_user_id: current_user.id, to_user_id: params[:to_user_id],
                           chat_room_id: chat_room_id(params[:to_user_id]))
        render json: {}
      end
    end

    def destroy_friendship
      friendship_to_destroy = Friendship.find_by(chat_room_id: chat_room_id(params[:to_user_id]))
      if friendship_to_destroy.destroy
        render json: {}
      end
    end
  end
end
