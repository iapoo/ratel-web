/* eslint-disable max-params */
import { CreationAnchor, } from './CreationAnchor'
import { DivideAnchor, } from './DivideAnchor'
import { ConnectionAnchor, } from './ConnectionAnchor'
import { ResizeAnchor, ResizeType, } from './ResizeAnchor'
import { RotationAnchor, } from './RotationAnchor'
import { ModifyAnchor, } from './ModifyAnchor'
import { Colors, Control, Line2D, Point2, Rectangle, Scale, StrokeDashStyle, } from '@/components/Engine'
import { Connector, FrameEntity, Item, LineEntity, LineType, Shapes, } from '../../Items'
import { Editor, } from '../../Editor/src/Editor'
import { PointAnchor, } from './PointAnchor'
import { ShapeEntity, ShapeTypes } from '../../Items/src/ShapeEntity'
import { AdapterAnchor, AdapterType } from './AdapterAnchor'
import { AdapterDirection } from '../../Shapes/src/EntityShape'
import { CubicControllerAnchor } from './CubicCotrollerAnchor'
import { ConnectorType } from '../../Shapes'
import { OrthogonalDivideAnchor } from './OrthogonalDivideAnchor'
import { OrthogonalMovementAnchor } from './OrthogonalMovementAnchor'
import { SystemUtils } from '@/components/Workspace/Utils'
import { ControllerAnchor } from './ControllerAnchor'
import { EditorUtils } from '../../Theme'

export class Holder extends Control {
  public static readonly PADDING = 32;
  public static readonly ANCHOR_RADIUS = 4;
  public static readonly ANCHOR_DISTANCE = 24;
  private _divideAnchors: DivideAnchor[] = [];
  private _rotationAnchor: RotationAnchor;
  private _modifyAnchor: ModifyAnchor;
  private _controllerAnchor: ControllerAnchor;
  private _leftCreationAnchor: CreationAnchor;
  private _topCreationAnchor: CreationAnchor;
  private _rightCreationAnchor: CreationAnchor;
  private _bottomCreationAnchor: CreationAnchor;
  private _leftResizeAnchor: ResizeAnchor;
  private _leftTopResizeAnchor: ResizeAnchor;
  private _topResizeAnchor: ResizeAnchor;
  private _rightTopResizeAnchor: ResizeAnchor;
  private _rightResizeAnchor: ResizeAnchor;
  private _rightBottomResizeAnchor: ResizeAnchor;
  private _bottomResizeAnchor: ResizeAnchor;
  private _leftBottomResizeAnchor: ResizeAnchor;
  private _sourceConnectionAnchor: ConnectionAnchor;
  private _targetConnectionAnchor: ConnectionAnchor;
  private _startAnchor:PointAnchor
  private _endAnchor: PointAnchor
  private _startAdapterAnchor: AdapterAnchor
  private _endAdapterAnchor: AdapterAnchor
  private _startCubicControllerAnchor: CubicControllerAnchor
  private _endCubicControllerAnchor: CubicControllerAnchor
  private _orthogonalDivideAnchors: OrthogonalDivideAnchor[] = []
  private _orthogonalMovementAnchors: OrthogonalMovementAnchor[] = []
  private _startCubicControllerLine: Line2D
  private _endCubicControllerLine: Line2D
  private _target: Item;
  private _inHolder: boolean;
  private _editor: Editor;
  private _inSelection: boolean

  public constructor (editor: Editor, target: Item, inHolder: boolean, inSelection: boolean) {
    super()
    this._editor = editor
    this._rotationAnchor = new RotationAnchor(editor, this)
    this._modifyAnchor = new ModifyAnchor(editor, this)
    this._controllerAnchor = new ControllerAnchor(editor, this)
    this._leftCreationAnchor = new CreationAnchor(editor, this)
    this._topCreationAnchor = new CreationAnchor(editor, this)
    this._rightCreationAnchor = new CreationAnchor(editor, this)
    this._bottomCreationAnchor = new CreationAnchor(editor, this)
    this._leftResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Left)
    this._leftTopResizeAnchor = new ResizeAnchor(editor, this, ResizeType.LeftTop)
    this._topResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Top)
    this._rightTopResizeAnchor = new ResizeAnchor(editor, this, ResizeType.RightTop)
    this._rightResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Right)
    this._rightBottomResizeAnchor = new ResizeAnchor(editor, this, ResizeType.RightBottom)
    this._bottomResizeAnchor = new ResizeAnchor(editor, this, ResizeType.Bottom)
    this._leftBottomResizeAnchor = new ResizeAnchor(editor, this, ResizeType.LeftBottom)
    this._sourceConnectionAnchor = new ConnectionAnchor(editor, this, true)
    this._targetConnectionAnchor = new ConnectionAnchor(editor, this, false)
    this._startAnchor = new PointAnchor(editor, this, true)
    this._endAnchor = new PointAnchor(editor, this, false)
    this._startCubicControllerAnchor = new CubicControllerAnchor(editor, this, true)
    this._endCubicControllerAnchor = new CubicControllerAnchor(editor, this, false)
    this._startAdapterAnchor = new AdapterAnchor(editor, this, AdapterType.BEGIN)
    this._endAdapterAnchor = new AdapterAnchor(editor, this, AdapterType.END)
    this._startCubicControllerLine = new Line2D(0, 0, 0, 0)
    this._endCubicControllerLine = new Line2D(0, 0, 0, 0)
    this._startCubicControllerLine.stroke.setStrokeWidth(EditorUtils.anchorCubiicControllerLineStrokeLineWidth)
    this._startCubicControllerLine.stroke.setColor(EditorUtils.anchorCubiicControllerLineStrokeColor)
    this._endCubicControllerLine.stroke.setStrokeWidth(EditorUtils.anchorCubiicControllerLineStrokeLineWidth)
    this._endCubicControllerLine.stroke.setColor(EditorUtils.anchorCubiicControllerLineStrokeColor)
    this.stroked = true
    this.stroke.setStrokeDashStyle(EditorUtils.holderStrokeDashStyle)
    this.stroke.setColor(EditorUtils.holderStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.holderStrokeLineWidth)
    this.filled = false
    this.clipped = false
    this._target = target
    this._inHolder = inHolder
    this._inSelection = inSelection
    this.hittable = false
    //this.transform = target.shape.transform
    this.boundary = Rectangle.makeLTWH(
      0,
      0,
      //target.boundary.left,
      //target.boundary.top,
      //-editor.horizontalSpace,
      //-editor.verticalSpace,
      target.boundary.width,
      target.boundary.height
    )
    this.transform = target.shape.worldTransform
    //this.rotation = target.rotation

    this._rotationAnchor.target = target
    this._modifyAnchor.target = target
    this._controllerAnchor.target = target
    this._leftResizeAnchor.target = target
    this.leftTopResizeAnchor.target = target
    this.topResizeAnchor.target = target
    this._rightTopResizeAnchor.target = target
    this._rightResizeAnchor.target = target
    this._rightBottomResizeAnchor.target = target
    this._bottomResizeAnchor.target = target
    this._leftBottomResizeAnchor.target = target
    this._leftCreationAnchor.target = target
    this._topCreationAnchor.target = target
    this._rightCreationAnchor.target = target
    this._bottomCreationAnchor.target = target
    this._startAnchor.target = target
    this._endAnchor.target = target
    this._startAdapterAnchor.target = target
    this._endAdapterAnchor.target = target
    this._sourceConnectionAnchor.target = target
    this._targetConnectionAnchor.target = target
    this._startCubicControllerAnchor.target = target
    this._endCubicControllerAnchor.target = target    
    this.createOrthogonalAnchors()
    this.layoutAnchors()
    if (this._inHolder && !this.target.locked) {
      this.addAnchors()
    }
  }

  public get editor (): Editor {
    return this._editor
  }
  public get inHolder (): boolean {
    return this._inHolder
  }

  public get target (): Item {
    return this._target
  }

  public get divideAnchors (): DivideAnchor[] {
    return this._divideAnchors
  }

  public get rotationAnchor (): RotationAnchor {
    return this._rotationAnchor
  }
  public get modifyAnchor (): ModifyAnchor {
    return this._modifyAnchor
  }
  public get controllerAnchor (): ControllerAnchor {
    return this._controllerAnchor
  }
  public get leftCreationAnchor (): CreationAnchor {
    return this._leftCreationAnchor
  }
  public get topCreationAnchor (): CreationAnchor {
    return this._topCreationAnchor
  }
  public get rightCreationAnchor (): CreationAnchor {
    return this._rightCreationAnchor
  }
  public get bottomCreationAnchor (): CreationAnchor {
    return this._bottomCreationAnchor
  }
  public get leftResizeAnchor (): ResizeAnchor {
    return this._leftResizeAnchor
  }
  public get leftTopResizeAnchor (): ResizeAnchor {
    return this._leftTopResizeAnchor
  }
  public get topResizeAnchor (): ResizeAnchor {
    return this._topResizeAnchor
  }
  public get rightTopResizeAnchor (): ResizeAnchor {
    return this._rightTopResizeAnchor
  }
  public get rightResizeAnchor (): ResizeAnchor {
    return this._rightResizeAnchor
  }
  public get rightBottomResizeAnchor (): ResizeAnchor {
    return this._rightBottomResizeAnchor
  }
  public get bottomResizeAnchor (): ResizeAnchor {
    return this._bottomResizeAnchor
  }
  public get leftBottomResizeAnchor (): ResizeAnchor {
    return this._leftBottomResizeAnchor
  }
  public get sourceConnectionAnchor (): ConnectionAnchor {
    return this._sourceConnectionAnchor
  }
  public get targetConnectionAnchor (): ConnectionAnchor {
    return this._targetConnectionAnchor
  }

  public layoutAnchors () {

    this._rotationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._modifyAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._controllerAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._topCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._bottomCreationAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftTopResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._topResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightTopResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._rightBottomResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._bottomResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._leftBottomResizeAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._sourceConnectionAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._targetConnectionAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._startCubicControllerAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
    this._endCubicControllerAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)

    this._rotationAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rotationAnchor.top = -Holder.ANCHOR_DISTANCE
    this._leftResizeAnchor.left = -Holder.ANCHOR_RADIUS
    this._leftResizeAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this.leftTopResizeAnchor.left = -Holder.ANCHOR_RADIUS
    this.leftTopResizeAnchor.top = -Holder.ANCHOR_RADIUS
    this.topResizeAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this.topResizeAnchor.top = -Holder.ANCHOR_RADIUS
    this._rightTopResizeAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rightTopResizeAnchor.top = -Holder.ANCHOR_RADIUS
    this._rightResizeAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rightResizeAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this._rightBottomResizeAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
    this._rightBottomResizeAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
    this._bottomResizeAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this._bottomResizeAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
    this._leftBottomResizeAnchor.left = -Holder.ANCHOR_RADIUS
    this._leftBottomResizeAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
    this._leftCreationAnchor.left = -Holder.ANCHOR_DISTANCE
    this._leftCreationAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this._topCreationAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this._topCreationAnchor.top = -Holder.ANCHOR_DISTANCE
    this._rightCreationAnchor.left = this._target.width + Holder.ANCHOR_DISTANCE
    this._rightCreationAnchor.top = this._target.height / 2 - Holder.ANCHOR_RADIUS
    this._bottomCreationAnchor.left = this._target.width / 2 - Holder.ANCHOR_RADIUS
    this._bottomCreationAnchor.top = this._target.height + Holder.ANCHOR_DISTANCE

    if(this.target instanceof ShapeEntity) {
      let shapeType = this.target.shapeType
      let startX = shapeType.modifierStartX * this.target.width
      let startY = shapeType.modifierStartY * this.target.height
      let endX = shapeType.modifierEndX * this.target.width
      let endY = shapeType.modifierEndY * this.target.height      
      let x = this.target.shape.modifier.x +  startX
      let y = this.target.shape.modifier.y + startY
      if(shapeType.modifyInPercent) { // only for x
        x = (endX - startX) * this.target.shape.modifier.x +  startX
        y = (endY - startY) * this.target.shape.modifier.y + startY
      }
      this._modifyAnchor.left = x - Holder.ANCHOR_RADIUS
      this._modifyAnchor.top = y - Holder.ANCHOR_RADIUS
      console.log(`Modify Anchor left= ${this._modifyAnchor.left} top = ${this._modifyAnchor.top}`)
      let controllerStartX = shapeType.controllerStartX * this.target.width
      let controllerStartY = shapeType.controllerStartY * this.target.height
      let controllerEndX = shapeType.controllerEndX * this.target.width
      let controllerEndY = shapeType.controllerEndY * this.target.height      
      let controllerX = this.target.shape.controller.x +  controllerStartX
      let controllerY = this.target.shape.controller.y + controllerStartY
      if(shapeType.controlInPercent) { // only for x
        controllerX = (controllerEndX - controllerStartX) * this.target.shape.controller.x +  controllerStartX
        controllerY = (controllerEndY - controllerStartY) * this.target.shape.controller.y + controllerStartY
      }
      this._controllerAnchor.left = controllerX - Holder.ANCHOR_RADIUS
      this._controllerAnchor.top = controllerY - Holder.ANCHOR_RADIUS
      let startAdapterX = shapeType.adapterStartX * this.target.width
      let startAdapterY = shapeType.adapterStartY * this.target.height
      let endAdapterX = shapeType.adapterEndX * this.target.width
      let endAdapterY = shapeType.adapterEndY * this.target.height
      let adapterX = this.target.shape.adapter.x + startX
      let adapterY = this.target.shape.adapter.y + startY
      let adapterEndX = this.target.shape.typeInfo.adapterDirection == AdapterDirection.X ? adapterX + this.target.shape.adapterSize : adapterX
      let adapterEndY = this.target.shape.typeInfo.adapterDirection == AdapterDirection.Y ? adapterY + this.target.shape.adapterSize : adapterY
      if(shapeType.adaptInPercent) {
        adapterX = (endAdapterX - startAdapterX) * this.target.shape.adapter.x + startAdapterX
        adapterY = (endAdapterY - startAdapterY) * this.target.shape.adapter.y + startAdapterY
        adapterEndX = this.target.shape.typeInfo.adapterDirection == AdapterDirection.X ? adapterX + (endAdapterX - startAdapterX) *this.target.shape.adapterSize : adapterX
        adapterEndY = this.target.shape.typeInfo.adapterDirection == AdapterDirection.Y ? adapterY + (endAdapterY - startAdapterY) *this.target.shape.adapterSize : adapterY
      }
      this._startAdapterAnchor.left = adapterX - Holder.ANCHOR_RADIUS
      this._startAdapterAnchor.top = adapterY - Holder.ANCHOR_RADIUS
      this._endAdapterAnchor.left = adapterEndX - Holder.ANCHOR_RADIUS
      this._endAdapterAnchor.top = adapterEndY - Holder.ANCHOR_RADIUS
    }

    if (this._target instanceof Connector) {      
      this._sourceConnectionAnchor.left = this._target.start.x - this._target.left - Holder.ANCHOR_RADIUS
      this._sourceConnectionAnchor.top = this._target.start.y - this._target.top - Holder.ANCHOR_RADIUS
      //console.log(`left = ${this._sourceConnectionAnchor.left}, top = ${this._sourceConnectionAnchor.top}`)
      this._targetConnectionAnchor.left = this._target.end.x - this._target.left -Holder.ANCHOR_RADIUS
      this._targetConnectionAnchor.top = this._target.end.y - this._target.top - Holder.ANCHOR_RADIUS
      this._startCubicControllerLine.start = new Point2(this._sourceConnectionAnchor.left + Holder.ANCHOR_RADIUS, this._sourceConnectionAnchor.top + Holder.ANCHOR_RADIUS)
      this._startCubicControllerLine.end = new Point2(this._sourceConnectionAnchor.left + Holder.ANCHOR_RADIUS + this._target.curveStartModifier.x * this._target.width, this._sourceConnectionAnchor.top + Holder.ANCHOR_RADIUS + this._target.curveStartModifier.y * this._target.height)
      //console.log(`${this._startCubicControllerLine.start.x}  ${this._startCubicControllerLine.start.y}  ${this._startCubicControllerLine.end.x}  ${this._startCubicControllerLine.end.y}`)
      this._endCubicControllerLine.start = new Point2(this._targetConnectionAnchor.left + Holder.ANCHOR_RADIUS, this._targetConnectionAnchor.top + Holder.ANCHOR_RADIUS)
      this._endCubicControllerLine.end = new Point2(this._targetConnectionAnchor.left + Holder.ANCHOR_RADIUS + this._target.curveEndModifier.x * this._target.width, this._targetConnectionAnchor.top + Holder.ANCHOR_RADIUS + this._target.curveEndModifier.y * this._target.height)
      //console.log(`${this._endCubicControllerLine.start.x}  ${this._endCubicControllerLine.start.y}  ${this._endCubicControllerLine.end.x}  ${this._endCubicControllerLine.end.y}`)      
      this._startCubicControllerAnchor.left = this._startCubicControllerLine.end.x - Holder.ANCHOR_RADIUS
      this._startCubicControllerAnchor.top = this._startCubicControllerLine.end.y - Holder.ANCHOR_RADIUS
      this._endCubicControllerAnchor.left = this._endCubicControllerLine.end.x - Holder.ANCHOR_RADIUS
      this._endCubicControllerAnchor.top = this._endCubicControllerLine.end.y - Holder.ANCHOR_RADIUS
    }
    if (this._target instanceof LineEntity) {
      switch (this._target.lineType) {
      case LineType.LEFT_TOP:
        this._startAnchor.left = -Holder.ANCHOR_RADIUS
        this._startAnchor.top = -Holder.ANCHOR_RADIUS
        this._endAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._endAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
        break
      case LineType.LEFT_BOTTOM:
        this._startAnchor.left = -Holder.ANCHOR_RADIUS
        this._startAnchor.top = this._target.height - -Holder.ANCHOR_RADIUS
        this._endAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._endAnchor.top = -Holder.ANCHOR_RADIUS
        break
      case LineType.RIGHT_TOP:
        this._startAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._startAnchor.top = -Holder.ANCHOR_RADIUS
        this._endAnchor.left = -Holder.ANCHOR_RADIUS
        this._endAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
        break
      case LineType.RIGHT_BOTTOM:
        this._startAnchor.left = this._target.width - Holder.ANCHOR_RADIUS
        this._startAnchor.top = this._target.height - Holder.ANCHOR_RADIUS
        this._endAnchor.left = -Holder.ANCHOR_RADIUS
        this._endAnchor.top = -Holder.ANCHOR_RADIUS
        break
      }
    }
    this.layoutOrthogonalAnchors()
    if (this._inHolder && !this._target.locked) {
      this.addAnchors()
    } else {
      this.removeAnchors()
    }
    //Hide for Connectors
    if(this._target instanceof Connector) {
      this.stroked = false
    } else {
      this.stroked = true
    }
  }

  public refreshOrthogonalAnchors() {
    if(this._target instanceof Connector && this._target.connectorType == ConnectorType.Orthogonal){
      //Need to refresh always
      //if(this._orthogonalDivideAnchors.length != (this._target.orthogonalPoints.length - 3) * 2 || true) {
        this.removeOrthogonalAnchors()
        this.createOrthogonalAnchors()
        this.addOrthogonalAnchors()
      //}
    }
  }

  private layoutOrthogonalAnchors() {
    if(this._target instanceof Connector && this._target.connectorType == ConnectorType.Orthogonal){
      const orthogonalPoints = this._target.orthogonalPoints
      //console.log(`length == ${orthogonalPoints.length}`)
      //console.log(` start x=${this._sourceConnectionAnchor.left} y = ${this._sourceConnectionAnchor.top} left =${this._target.left} top=${this.target.top} width = ${this.target.width} height=${this.target.height} start x = ${this._target.start.x} y = ${this._target.start.y} end x = ${this._target.end.x} y = ${this._target.end.y}`)
      //SystemUtils.debugPoints(orthogonalPoints)
      this._orthogonalDivideAnchors.forEach(orthogonalDivideAnchor => {
        if(orthogonalPoints.length > orthogonalDivideAnchor.index + 1) {
          const orthogonalPoint = orthogonalPoints[orthogonalDivideAnchor.index]
          const nextOrthogonalPoint = orthogonalPoints[orthogonalDivideAnchor.index + 1]
          if(orthogonalDivideAnchor.isLeft) {
            orthogonalDivideAnchor.left = orthogonalPoint.x * 0.75 + nextOrthogonalPoint.x * 0.25 - Holder.ANCHOR_RADIUS
            orthogonalDivideAnchor.top = orthogonalPoint.y  * 0.75 + nextOrthogonalPoint.y * 0.25 - Holder.ANCHOR_RADIUS
          } else {
            orthogonalDivideAnchor.left = orthogonalPoint.x * 0.25 + nextOrthogonalPoint.x * 0.75 - Holder.ANCHOR_RADIUS
            orthogonalDivideAnchor.top = orthogonalPoint.y  * 0.25 + nextOrthogonalPoint.y * 0.75 - Holder.ANCHOR_RADIUS
          }
        }
      })      
      this._orthogonalMovementAnchors.forEach(orthogonalMovementAnchor => {        
        if(orthogonalPoints.length > orthogonalMovementAnchor.index + 1) {
          const orthogonalPoint = orthogonalPoints[orthogonalMovementAnchor.index]
          const nextOrthogonalPoint = orthogonalPoints[orthogonalMovementAnchor.index + 1]
          orthogonalMovementAnchor.left = (orthogonalPoint.x + nextOrthogonalPoint.x) / 2 - Holder.ANCHOR_RADIUS
          orthogonalMovementAnchor.top = (orthogonalPoint.y + nextOrthogonalPoint.y) / 2 - Holder.ANCHOR_RADIUS
          //console.log(`pos= ${orthogonalMovementAnchor.left}, ${orthogonalMovementAnchor.top}`)
        }        
      })
    }
  }

  private createOrthogonalAnchors() {
    if(this._target instanceof Connector && this._target.connectorType == ConnectorType.Orthogonal){
      const orthogonalPointCount = this._target.orthogonalPoints.length
      const orthogonalPoints = this._target.orthogonalPoints
      this._orthogonalDivideAnchors.length = 0
      this._orthogonalMovementAnchors.length = 0
      //console.log(`points = ${orthogonalPointCount} ${orthogonalPoints}`)
      for(let i = 1; i < orthogonalPointCount - 2; i ++) {
        const orthogonalPoint = orthogonalPoints[i]
        const nextOrthogonalPoint = orthogonalPoints[i + 1]
        const orthogonalDivideAnchor1 = new OrthogonalDivideAnchor(this._editor, this, i, true)
        const orthogonalDivideAnchor2 = new OrthogonalDivideAnchor(this._editor, this, i, false)
        const orthogonalMovementAnchor = new OrthogonalMovementAnchor(this._editor, this, i)
        orthogonalDivideAnchor1.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
        orthogonalDivideAnchor2.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
        orthogonalMovementAnchor.scale = new Scale(1 / this.editor.zoom, 1 / this.editor.zoom)
        orthogonalMovementAnchor.target = this._target
        orthogonalMovementAnchor.left = (orthogonalPoint.x + nextOrthogonalPoint.x) / 2 - Holder.ANCHOR_RADIUS
        orthogonalMovementAnchor.top = (orthogonalPoint.y + nextOrthogonalPoint.y) / 2 - Holder.ANCHOR_RADIUS
        orthogonalDivideAnchor1.target = this._target
        orthogonalDivideAnchor1.left = orthogonalPoint.x * 0.75 + nextOrthogonalPoint.x * 0.25 - Holder.ANCHOR_RADIUS
        orthogonalDivideAnchor1.top = orthogonalPoint.y  * 0.75 + nextOrthogonalPoint.y * 0.25 - Holder.ANCHOR_RADIUS
        orthogonalDivideAnchor2.target = this._target
        orthogonalDivideAnchor2.left = orthogonalPoint.x * 0.25 + nextOrthogonalPoint.x * 0.75 - Holder.ANCHOR_RADIUS
        orthogonalDivideAnchor2.top = orthogonalPoint.y  * 0.25 + nextOrthogonalPoint.y * 0.75 - Holder.ANCHOR_RADIUS
        this._orthogonalDivideAnchors.push(orthogonalDivideAnchor1)
        this._orthogonalDivideAnchors.push(orthogonalDivideAnchor2)
        this._orthogonalMovementAnchors.push(orthogonalMovementAnchor)
      }
    }
  }

  private addOrthogonalAnchors() {    
    if(this._target instanceof Connector && this._target.connectorType == ConnectorType.Orthogonal){
      this._orthogonalDivideAnchors.forEach(orthogonalDivideAnchor => {
        this.addNode(orthogonalDivideAnchor)
      })      
      this._orthogonalMovementAnchors.forEach(orthogonalMovementAnchor => {
        this.addNode(orthogonalMovementAnchor)
      })
      //this._orthogonalDivideAnchors.length = 0
      //this._orthogonalMovementAnchors.length = 0
    }
  }
  
  private removeOrthogonalAnchors() {
    if(this._target instanceof Connector && this._target.connectorType == ConnectorType.Orthogonal){
      this._orthogonalDivideAnchors.forEach(orthogonalDivideAnchor => {
        this.removeNode(orthogonalDivideAnchor)
      })      
      this._orthogonalMovementAnchors.forEach(orthogonalMovementAnchor => {
        this.removeNode(orthogonalMovementAnchor)
      })
      //this._orthogonalDivideAnchors.length = 0
      //this._orthogonalMovementAnchors.length = 0
    }
  }

  private addAnchors () {
    if (this._target instanceof LineEntity) {
      this.addNode(this._startAnchor)
      this.addNode(this._endAnchor)
    } else if (this._target instanceof Connector) {
      if(this._target.connectorType == ConnectorType.Curve) {
        this.addNode(this._startCubicControllerLine)
        this.addNode(this._endCubicControllerLine)
        this.addNode(this._startCubicControllerAnchor)
        this.addNode(this._endCubicControllerAnchor)
      }
      this.addOrthogonalAnchors()
      this.addNode(this._sourceConnectionAnchor)
      this.addNode(this._targetConnectionAnchor)
    } else {
      if(!(this._target.parent instanceof FrameEntity)) {
        this.addNode(this._leftResizeAnchor)
        this.addNode(this._leftTopResizeAnchor)
        this.addNode(this._topResizeAnchor)
        this.addNode(this._rightTopResizeAnchor)
        this.addNode(this._rightResizeAnchor)
        this.addNode(this._rightBottomResizeAnchor)
        this.addNode(this._bottomResizeAnchor)
        this.addNode(this._leftBottomResizeAnchor)
        if (this._inSelection) {
          this.addNode(this._leftCreationAnchor)
          this.addNode(this._topCreationAnchor)
          this.addNode(this._rightCreationAnchor)
          this.addNode(this._bottomCreationAnchor)
          this.addNode(this._rotationAnchor)
          if(this._target instanceof ShapeEntity) {
            if (this._target.shapeType.modifiable) {
              this.addNode(this._modifyAnchor)
            }
            if(this._target.shapeType.controllable) {
              this.addNode(this._controllerAnchor)
            }
            if(this._target.shapeType.adaptable) {
              this.addNode(this._endAdapterAnchor)
              this.addNode(this._startAdapterAnchor)
            }
          }
        }
      }
    }
  }

  private removeAnchors () {
    if (this._target instanceof LineEntity) {
      this.removeNode(this._startAnchor)
      this.removeNode(this._endAnchor)
    } else if (this._target instanceof Connector) {
      if(this._target.connectorType == ConnectorType.Curve) {
        this.removeNode(this._startCubicControllerLine)
        this.removeNode(this._endCubicControllerLine)
        this.removeNode(this._startCubicControllerAnchor)
        this.removeNode(this._endCubicControllerAnchor)
      }
      this.removeOrthogonalAnchors()
      this.removeNode(this._sourceConnectionAnchor)
      this.removeNode(this._targetConnectionAnchor)
    } else {
      this.removeNode(this._leftResizeAnchor)
      this.removeNode(this._leftTopResizeAnchor)
      this.removeNode(this._topResizeAnchor)
      this.removeNode(this._rightTopResizeAnchor)
      this.removeNode(this._rightResizeAnchor)
      this.removeNode(this._rightBottomResizeAnchor)
      this.removeNode(this._bottomResizeAnchor)
      this.removeNode(this._leftBottomResizeAnchor)
      if (this._inSelection) {
        this.removeNode(this._leftCreationAnchor)
        this.removeNode(this._topCreationAnchor)
        this.removeNode(this._rightCreationAnchor)
        this.removeNode(this._bottomCreationAnchor)
        this.removeNode(this._rotationAnchor)
        if(this._target instanceof ShapeEntity) {
          if (this._target.shapeType.modifiable) {
            this.removeNode(this._modifyAnchor)
          }
          if(this._target.shapeType.controllable) {
            this.addNode(this._controllerAnchor)
          }
          if(this._target.shapeType.adaptable) {
            this.removeNode(this._startAdapterAnchor)
            this.removeNode(this._endAdapterAnchor)
          }
        }
      }
    }
  }
  
}
