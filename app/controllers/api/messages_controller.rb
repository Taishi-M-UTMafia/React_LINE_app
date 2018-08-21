module Api
  class MessagesController < ApplicationController

    def index
      @friendship_id=set_friendship_id(params[:openChatID])
      @messages = Message.where(friendship_id: @friendship_id)
      render json: @messages
    end

    def create
      @friendship_id=set_friendship_id(params[:open_chat_id])
      @message=Message.new(content: params[:value], from_user_id: current_user.id, friendship_id: @friendship_id)
      if  @message.save
        render json: @message
      end
    end

    def post_image

    end
  end

end
