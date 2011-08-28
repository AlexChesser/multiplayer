var Class = require('./class'),
    J3D = require('./j3d').J3D,
    v3 = require('./j3d').v3;

module.exports = Class.extend({
    init: function(sim){
        this.sim = sim;
        
        //if(!checkWebGL())
        //  return;
        
        this.engine = new J3D.Engine();	
        this.engine.setClearColor(J3D.Color.black);
        this.engine.scene.ambient = new J3D.Color(.5, .5, .5, 1);
        
        this.light = new J3D.Transform();
        this.light.light = new J3D.Light(J3D.DIRECT);
        this.light.light.color = new J3D.Color(.5, .5, .5, 1);
        this.light.light.direction = new v3(1, 0, 1).norm();
        
        // Create a bunch of cubes to represent each player
        this.cubes = [];
        for(var i = 0; i<20; i++){
            this.cubes[i] = new J3D.Transform();
            this.cubes[i].geometry = J3D.Primitive.Cube(1, 1, 1);		
            this.cubes[i].renderer = new J3D.Phong();
            this.cubes[i].renderer.color = new J3D.Color(1,0,0,1);
            
            this.cubes[i].position.x = (Math.random()-0.5)*10.0;
            this.cubes[i].position.z = (Math.random()-0.5)*10.0;
            
            this.engine.scene.add(this.cubes[i]);
        }
        
        this.camera = new J3D.Transform();
        this.camera.camera = new J3D.Camera();
        this.camera.position.z = 30;
        this.camera.position.y = 1;
        this.engine.camera = this.camera;
        
        this.engine.scene.add(this.camera, this.light);
	},
    render: function(){
        for(var i=0; i<this.cubes.length;i++){
            if(i<this.sim.entities.length){
                this.cubes[i].renderer.color = new J3D.Color(this.sim.entities[i].r,this.sim.entities[i].g,this.sim.entities[i].b,1);
                this.cubes[i].position.x = this.sim.entities[i].x;
                this.cubes[i].position.y = -this.sim.entities[i].y;
                this.cubes[i].position.z = this.sim.entities[i].z;
            } else {
                this.cubes[i].position.x = 1000000000.0;
                this.cubes[i].position.y = 1000000000.0;
                this.cubes[i].position.z = 1000000000.0;
            }
        }
        
//        this.cube.rotation.x += Math.PI * J3D.Time.deltaTime / 6000;
		//this.cube.rotation.y += Math.PI/2 * J3D.Time.deltaTime / 3000;
		this.engine.render();
    }
});
