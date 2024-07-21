require "application_responder"
class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html
  before_action do
    begin
      authenticate_user!
      if user_signed_in?
        @user_role = current_user.role

      end
    rescue Exception => err
      # Tratar a exceção aqui, se necessário
      puts "Erro ao autenticar o usuário: #{err.message}"
    end
    if user_signed_in?
      cookies.signed[:user_id] ||= current_user.id
      cookies.signed[:user_id] = current_user.id if cookies.signed[:user_id] != current_user.id
    end

    if  request.env['REQUEST_PATH'].include? '/companies'
      if !can?(:manage, Company)
        redirect_back fallback_location: root_path
      end
    elsif (request.env['REQUEST_PATH'].include? "/users/") && (request.env['REQUEST_PATH'] != "/users/#{@user_role.id}")
      if  !can?(:manage, User)
        redirect_back fallback_location: root_path
      end
    elsif  request.env['REQUEST_PATH'].include? "/roles"
      if  !can?(:manage, Role)
        redirect_back fallback_location: root_path
      end
    elsif  request.env['REQUEST_PATH'].include? "/cards"
      if  !can?(:manage, Card)
        redirect_back fallback_location: root_path
      end
    end


  end

  def action_name_label
    case action_name
    when 'create'
      'new'
    when 'update'
      'edit'
    else
      action_name
    end
  end

  private
  def current_ability
     "Abilities::Test".constantize.new(current_user)
  end
end
