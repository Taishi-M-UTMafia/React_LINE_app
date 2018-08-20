module Api
  class MessagesController < ApplicationController

    def index
      @friendship_id=set_friendship_id(params[:openChatID])
      # @friendship_id="7-9"
      @messages = Message.where(friendship_id: @friendship_id)
      render json: @messages
    end

    def create
      @friendship_id=set_friendship_id(params[:open_chat_id])
      if !(params[:open_chat_id]==0)
        Message.create(content: params[:value], from_user_id: current_user.id, friendship_id: @friendship_id)
      end
      render json: @friendship_id
    end

    def set_friendship_id(to_user_id)
      @to_user_id=to_user_id
      @current_user_id=current_user.id.to_i
      if current_user.id > @to_user_id.to_i
        "#{@to_user_id.to_i}-#{@current_user_id}"
      else
        "#{@current_user_id}-#{@to_user_id.to_i}"
      end
    end
  end

end
