# frozen_string_literal: true

module Api
  module V3
    # PERMISSIONS RELATED API CALLS
    class PermissionsController < ApplicationController
      # GET CURRENT LIST OF PERMISSIONS FROM PERMISSIONS DB
      def get_permissions
        result = check_token_for_permission
        render json: result.to_json and return if result[:error]

        permissions = Permission.permission_ids

        render json: { status: 200, data: { permissions: permissions } }.to_json
      end
    end
  end
end