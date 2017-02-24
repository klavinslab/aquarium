class JsonController < ApplicationController

  before_filter :signed_in_user

  def method_ok m

    if m

      if [ "all", "where", "find", "find_by_name", "new" ].member? m
        return true
      else
        raise "Illegal method #{m} requested from front end."
      end
    else
      false
    end

  end

  def index

    begin

      result = Object.const_get(params[:model])
      result = result.find(params[:id]) if params[:id] 
      result = result.send(params[:method],*params[:arguments]) if method_ok(params[:method]) && params[:method] != "where"
      result = result.where(params[:arguments]) if params[:method] == "where"
      result = result.as_json(methods: params[:methods]) if ( params[:methods] )

      render json: result

    rescue Exception => e 

      logger.info e.inspect
      logger.info e.backtrace
      render json: { errors: e.to_s }, status: 422

    end

  end

  def upload 

    u = Upload.new

    File.open(params[:files][0].tempfile) do |f|
      u.upload = f # just assign the logo attribute to a file
      u.name = params[:files][0].original_filename
      u.save
    end

    unless u.errors.empty?
      logger.info "ERRORS: #{u.errors.full_messages}"
      render json: { error: "#{u.errors.full_messages}" }
      return
    end

    render json: u.as_json(methods: :url)

  end    

  def save

    if ( params[:id] ) 
      record = Object.const_get(params[:model][:model]).find(params[:id])
    else
      record = Object.const_get(params[:model][:model]).new
    end

    record.attributes.each do |name,val|
      record[name] = params[name]
    end

    record.save

    if record.errors.empty?
      render json: record
    else
      logger.into record.errors.full_messages.join(', ')
      render json: { errors: record.errors }, status: 422    
    end

  end

  def delete

    record = Object.const_get(params[:model][:model]).find(params[:id])    

    if record.respond_to?(:may_delete) && record.may_delete(current_user)
      record.delete
      render json: record      
    else 
      render json: { errors: [ "Insufficient permission to delete" ] }, status: 422 
    end 

  end

  def sid str
    str ? str.split(':')[0] : 0
  end

  def items # ( sid, oid )

    begin

      sample = Sample.find_by_id(params[:sid])
      ot = ObjectType.find_by_id(params[:oid])

      if sample && ot

        if ot.handler == 'collection'
          logger.info Collection.parts(sample,ot) 
          render json: Collection.parts(sample,ot) 
        else
          render json: sample.items.reject { |i| i.deleted? || i.object_type_id != ot.id }
        end

      elsif sample && !ot

        render json: []

      else

        render json: ot.items.reject { |i| i.deleted? }

      end  

    rescue Exception => e

      render json: { errors: "Could not find sample: #{e.to_s}" }, status: 422

    end

  end

  def current
    render json: current_user
  end

end
