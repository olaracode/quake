class Api::FeaturesController < ApplicationController
    # GET /api/feature
    def index
        page = params.fetch(:page, 1)
        per_page = params.fetch(:limit, 10)

        # Soft limit
        if per_page.to_i > 1000
            per_page = 1000
        end
        @features = Feature.order(time: :desc).paginate(page: page, per_page: per_page)
        render json: {
            data: @features,
            pagination: {
                current_page: @features.current_page,
                total: @features.total_entries,
                per_page: @features.per_page
            }
        }
    end
    def comments
        sismo = Feature.find(params[:id])
        comments = sismo.comments
        render json: { data: comments }
    end
end
