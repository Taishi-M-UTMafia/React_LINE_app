module Api
  class FriendshipsController < ApplicationController
    before_action :set_friendship, only: [:index, :update_last_access, :destroy_friendship]

    def set_friendship
      @friendship = Friendship.find_by(chat_room_id: chat_room_id(params[:to_user_id]))
    end

    def index
      render json: @friendship
    end

    def update_last_access
      if current_user.id === @friendship[:from_user_id]
        @friendship[:from_user_last_access] = Time.now.to_i
      elsif params[:to_user_id].to_i === @friendship[:from_user_id]
        @friendship[:to_user_last_access] = Time.now.to_i
      end
      render json: @friendship if @friendship.save
    end

    def create_friendship
      # chat_room_idは友達関係の一意性を担保するための、from_user_idとto_user_idの組み合わせ(小さい順)。
      # HACK(Sunny): chat_room_idをいちいちつくるのははナンセンス
      new_friendship = Friendship.new(from_user_id: current_user.id, to_user_id: params[:to_user_id],
                                      chat_room_id: chat_room_id(params[:to_user_id]))
      render json: [] if new_friendship.save
    end

    def destroy_friendship
      render json: [] if @friendship.destroy
    end
  end
end
