class WorkflowThreadsController < ApplicationController

  def index

    if params[:workflow_id]
     render json: WorkflowThread.where(workflow_id: params[:workflow_id].to_i)
    else
      render json: WorkflowThread.all
    end

  end

  def create

    wf = Workflow.find(params[:workflow_id])
    spec = wf.make_spec_from_hash(params[:thread])

    render json: WorkflowThread.create(
      spec,
      params[:workflow_id]
    )

  end

end