class Api::FeaturesController < ApplicationController
    # GET /api/feature
    def index
        page = params.fetch(:page, 1)
        per_page = params.fetch(:per_page, 10)
        # Magtype is going to be [ml, mt]
        mag_type = params.fetch(:mag_type, nil)
        mag_type = mag_type.gsub(/[\[\]"]/, '').split(',') if mag_type.present?
        # Soft limit
        if per_page.to_i > 1000
            per_page = 1000
        end
        
        
        @features = Feature.order(time: :desc)
        @features = @features.where(magType: mag_type) if mag_type.present?
        @features = @features.paginate(page: page, per_page: per_page)
        render json: {
            data: @features,
            pagination: {
                current_page: @features.current_page,
                total: @features.total_entries,
                per_page: @features.per_page
            },
            mag_type: mag_type
        }
    end

    def all_comments
        comments = Comment.all
        render json: { data: comments }
    end

    def comments
        sismo = Feature.find(params[:id])
        puts "sismo: #{sismo.inspect}"
        comments = sismo.comments
        puts "comments: #{comments.inspect}"
        render json: { data: comments }
    end

    def create_comments
        sismo = Feature.find(params[:id])
    
        # Check if the feature exists
        if sismo.nil?
            render json: { error: 'Feature not found' }, status: 404
            return
        end
        
        # check if comment_params is not an empty string
        if comment_params[:body].strip.empty?
            render json: { error: 'Comment cannot be empty' }, status: 400
            return
        end

        puts "SISMO: #{sismo.inspect}"
    
        @comment = Comment.new(content: comment_params[:body], feature_id: sismo.id)
        if @comment.save
            render json: { data: @comment }, status: 201
        else
          render json: { error: @comment.errors.full_messages }, status: 400
        end
     
    end

    private

    def comment_params
     params.permit(:body)
    end
end
