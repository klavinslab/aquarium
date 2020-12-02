# frozen_string_literal: true

module Api
  module V3
    # Token related api calls
    class TokenController < ApplicationController
      # Creates a token.
      #
      # @param login [String] login
      # @param password [String] password
      # @return a token
      def create
        login = params[:login].to_s.strip.downcase
        password = params[:password]

        user = User.find_by(login: login)
        render json: { error: 'Invalid' }.to_json, status: :unauthorized and return if !user || !user.authenticate(password)

        ip = request.remote_ip
        timenow = Time.now.utc

        # Create a token
        token = UserToken.new_token(ip)
        render json: { error: 'Invalid' }.to_json, status: :unauthorized unless token

        user_token = UserToken.new
        user_token.user_id = user.id
        user_token.token = token
        user_token.ip = ip
        user_token.timenow = timenow
        user_token.save

        render json: { token: token }.to_json, status: :ok
      end

      # Removes a token or optionally all tokens associated with this user.
      #
      # @param token [String] a token
      # @param all [String] "true" or "on" to remove all tokens associated with this user
      # @return a success message
      def delete
        ip = request.remote_ip
        token = params[:token].to_s.strip.downcase
        all = (params[:all] == 'true' || params[:all] == 'on')

        signout = User.sign_out({ ip: ip, token: token, all: all })
        render json: { error: 'Invalid' }.to_json, status: :unauthorized and return unless signout

        render json: { message: 'Signed out' }.to_json, status: :ok
      end

      # Returns the user for the token and an optional permission_id.
      #
      # @param token [String] a token
      # @param permission_id [Int] the optional permission_id to check
      # @return the user
      def get_user
        permission_id = params[:permission_id] ? params[:permission_id].to_i : 0

        # Check for permission_id permissions
        status, response = check_token_for_permission(permission_id)
        render json: response.to_json, status: status.to_sym
      end
    end
  end
end