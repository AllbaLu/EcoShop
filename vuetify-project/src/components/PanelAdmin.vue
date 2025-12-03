<script>
import { ref } from 'vue';
</script>



<template>
  <v-app>
    <v-app-bar app>
      <v-btn>LOGO</v-btn>
      <v-spacer />
      <span>Buenos dias, {nombre colaborador}, <br> bienvenido al panel de administracion</span>
      <v-btn outlined class="bg-secondary">Sign in</v-btn>
      <v-btn class="bg-secondary">Register</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="mb-8" cols="8" md="8"> 
          <v-col cols="12" md="4">
            <v-img
              src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
              cover
              class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4"
              aspect-ratio="2">
            </v-img>
          </v-col>

          <v-col cols="12" md="4">
            <v-img
              src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
              cover
              class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4"
              aspect-ratio="2">
            </v-img>
          </v-col>

          <v-col cols="12" md="4">
            <v-img
              src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
              cover
              class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4"
              aspect-ratio="2">
            </v-img>
          </v-col>
        </v-row>

        <h2>INGRESO DE PRODUCTOS A LA PAGINA:</h2>

        <v-container class="mt-5">
          <v-row>
            <v-col cols="6s" md="4">
              <v-card class="pa-6" elevation="5">
                  <div
                    class="d-flex justify-center align-center mt-6"
                    style="
                    width: 100%;
                    height: 250px;
                    border: 2px dashed #bbb;
                    border-radius: 10px;
                    background-color: #f8f8f8;
                  ">
                  <span style="color: #999;">Vista previa de la imagen</span>
                </div>
                <br>
                <h3 class="mb-4">Carga imagen del producto</h3>
                <p>Inserte URL, o cargue desde local:</p>
                <h3>Link, o URL (http://www.example.com)</h3>
                <br>
                <v-form>
                  <v-text-field label="URL de la imagen" placeholder="http://www.example.com"> </v-text-field>
                  <div class="d-flex flex-start mt-4">
                    <img
                      src="../assets/upload.png"
                      alt="upload"
                      height="50"
                      width="50"
                      class="cursor-pointer"
                    />
                  </div>
                </v-form>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="pa-6" elevation="3">
                  <v-form>
                    <p>Nombre producto</p>
                    <v-text-field 
                     class="custom-input"
                     style="border-radius: 50px;"
                     placeholder="Value"
                     ></v-text-field>
                    <p>Descripcion producto</p>
                    <v-text-field class="custom-input" placeholder="Value"></v-text-field>

                    <p>Valor producto</p>
                    <v-text-field
                    class="custom-input"
                    type="number"
                    placeholder="Value"
                    ></v-text-field>

                    <p>Stock producto</p>
                    <v-textarea
                    class="custom-input"
                    placeholder="Value"
                    ></v-textarea>

                    <v-btn block class="bg-black" size="large">INGRESAR</v-btn>
                  </v-form>                
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>

    <v-footer>
      <hr>
      <v-row>
        <v-col>
          <div>
            <img src="../assets/figma.png" alt="figma" height="40px" width="40px">
            <br>
            <img src="../assets/x.png" alt="x" height="25px" width="25px">
            <img src="../assets/instagram.png" alt="instagram" height="25px" width="25px">
            <img src="../assets/youtube.png" alt="youtube" height="25px" width="25px">
            <img src="../assets/linkedin.png" alt="linkedin" height="25px" width="25px">
          </div>
        </v-col>
        <v-col>
          <h2>Use cases</h2>
          <br>
          <p>UI desing</p>
          <p>UX desing</p>
          <p>Wireframing</p>
          <p>Diagramming</p>
          <p>Brainstorming</p>
          <p>Online whiteboard</p>
          <p>Team collaboration</p>
        </v-col>

        <v-col>
          <h2>Explore</h2>
          <br>
          <p>Desing</p>
          <p>Prototyping</p>
          <p>Development features</p>
          <p>Desing systems</p>
          <p>collaboration features</p>
          <p>Desing process</p>
          <p>Figjam</p>
        </v-col>

        <v-col>
          <h2>Resources</h2>
          <br>
          <p>Blog</p>
          <p>Best practices</p>
          <p>Colors</p>
          <p>Color wheel</p>
          <p>Support</p>
          <p>Developers</p>
          <p>Resource</p>
          <br>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>



<style scoped>


.v-btn {
  margin-left: 8px;
}
.v-btn:hover {
  background-color: #ffeb3b ; /* Cambia a un color amarillo brillante al pasar el cursor */
  color: #000000 ; /* Cambia el color del texto al pasar el cursor */
}
</style>
