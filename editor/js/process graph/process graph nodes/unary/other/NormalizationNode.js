var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NormalizationNode = (function (_super) {
    __extends(NormalizationNode, _super);
    function NormalizationNode() {
        _super.call(this, "Normalisierung", 1, 1);
    }
    NormalizationNode.prototype.calculate = function (values) {
        var sourceColorMap = values[0];
        var resultColorMap = (new Normalization()).convolute(sourceColorMap);
        return [resultColorMap];
    };
    return NormalizationNode;
}(ProcessGraphNode));
//# sourceMappingURL=NormalizationNode.js.map