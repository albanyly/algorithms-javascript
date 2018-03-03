/**
 *  HanoiTower class
 */
function HanoiTower(label) {
	this.label = label;
	this.values = new Array();
}
HanoiTower.prototype.push = function(value) {
	if ((typeof value) != "number") {
		throw "Error: disk value is not a number.<br>";
	}
	else if (this.values.length > 0 && value > this.values[this.values.length-1]) {
		throw "Error: can't put a disk of larger value on top of a disk of smaller value.<br>";
	}
	else {
		this.values.push(value);
	}
}
HanoiTower.prototype.pop = function() {
	return this.values.pop();
}
HanoiTower.prototype.toString = function() {
	return "Tower:" + this.label + " " + this.values.concat() + "<br>";
}
HanoiTower.prototype.moveDiskTo = function(tower) {
	var value = this.pop();
	var str = "move disk " + value + " from " + this.label + " to " + tower.label + "<br>";
	tower.push(value);
	return str;
}
/**
 *  HanoiTowerPlayer class
 */
function HanoiTowerPlayer(n) {
	this.n = n;
	this.source = new HanoiTower("source");
	this.dest = new HanoiTower("dest");
	this.buffer = new HanoiTower("buffer");
}
HanoiTowerPlayer.prototype.moveDisks = function(n, source, dest, buffer) {
	if (n == 1) {
		source.moveDiskTo(dest);
	}
	else if (n > 1) {
		this.moveDisks(n-1, source, buffer, dest);
		source.moveDiskTo(dest);
		this.moveDisks(n-1, buffer, dest, source);
		var str = (n > 2)?("" + (n-1) + " to 1"):"1";
		document.write("Move disk " + str + " from " + source.label + " to " + dest.label + "<br>");
	}
}
HanoiTowerPlayer.prototype.play = function() {
	try {
		for (var i = this.n; i > 0; i--) {
			this.source.push(i);
		}
		document.write("Before moving disks:<br>");
		document.write(this.source.toString());
		document.write(this.dest.toString());
		document.write(this.buffer.toString());

		document.write("Moving disks...<br>");
		this.moveDisks(this.n, this.source, this.dest, this.buffer);

		document.write("After moving disks:<br>");
		document.write(this.source.toString());
		document.write(this.dest.toString());
		document.write(this.buffer.toString());
	}
	catch(error) {
		document.write(error);
	}
}
