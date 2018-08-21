module Api
  class FriendshipsController < ApplicationController

    def create
      @friendship_id=set_friendship_id(params[:to_user_id])
      @friendship= Friendship.new(from_user_id: current_user.id,to_user_id:params[:to_user_id],friendship_id: @friendship_id)
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

    def set_friendship_id(to_user_id)
      @to_user_id=to_user_id
      @to_user_id_to_i=@to_user_id.to_i
      @current_user_id=current_user.id.to_i
      if current_user.id > @to_user_id
        "#{@to_user_id_to_i}-#{@current_user_id}"
      else
        "#{@current_user_id}-#{@to_user_id_to_i}"
      end
    end
  end

end
