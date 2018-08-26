module Api
  class MessagesController < ApplicationController
    def index
      # TODO(Sunny): Messageモデルのfriendship_idはfriendshipのidを入れるようにする
      #              ⇒一旦友達関係がdestroyされるとfriendshipのidも変わってしまうので無理なのでは
      # FIXME(Sunny): 全メソッドでchat_room_idを定義する全く同じメソッドがあるのでドライにできないか？
      chat_room_id = Friendship.find_by(chat_room_id: chat_room_id(params[:open_chat_id]))
      render json: chat_room_id.all_messages
    end

    def create
      chat_room_id = Friendship.find_by(chat_room_id: chat_room_id(params[:open_chat_id]))
      new_message  = Message.new(content: params[:value],
                                 from_user_id: current_user.id,
                                 friendship_id: chat_room_id(params[:open_chat_id]),
                                 message_type: "text")
      if new_message.save
        render json: chat_room_id.all_messages
      end
    end

    def post_image
      posted_image = params[:image]
      chat_room_id = Friendship.find_by(chat_room_id: chat_room_id(params[:open_chat_id]))
      path         = Time.now.to_i.to_s + posted_image.original_filename
      output_path  = Rails.root.join('public/message_images', path)
      new_image    = Message.new(content: path,
                                 from_user_id: current_user.id,
                                 friendship_id: chat_room_id(params[:open_chat_id]),
                                 message_type: "image")

      File.open(output_path, 'w+b') do |fp|
        fp.write  posted_image.tempfile.read
      end

      if new_image.save
        render json: chat_room_id.all_messages
      end
    end
  end
end
