module Api
  class FriendshipsController < ApplicationController
    def create_friendship
      # chat_room_idは友達関係の一意性を担保するための、from_user_idとto_user_idの組み合わせ(小さい順)。
      # HACK(Sunny): chat_room_idをいちいちつくるのははナンセンス
      new_friendship = Friendship.new(from_user_id: current_user.id, to_user_id: params[:to_user_id],
                                      chat_room_id: chat_room_id(params[:to_user_id]))
      render json: [] if new_friendship.save
    end

    def destroy_friendship
      friendship_to_destroy = Friendship.find_by(chat_room_id: chat_room_id(params[:to_user_id]))
      render json: [] if friendship_to_destroy.destroy
    end
  end
end
