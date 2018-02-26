# module DeviseWhitelist 
#   extend ActiveSupport::Concern 
  
#    included do 
#     before_filter :configure_permitted_parameters, if: :devise_controller? 
#   end 
  
#   def configure_permitted_parameters 
#    devise.parameter.sanitzier.permit(:sign_up, keys: [:email, :username, :password]) 
#    devise.parameter.sanitzier.permit(:account_update, keys: [:email, :username, :password]) 
#   end  
  
#   end