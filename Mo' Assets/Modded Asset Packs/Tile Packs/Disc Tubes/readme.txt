________________________________________________
________________________________________________

— Quick intro

This exists only because I thought it was "interesting" to try to do circular layered tiles/more DiscPipe based tiles. (These were also done by hand without looking at DiscPipe's graphic sheet, lol.)
     * (Also this text readme is a mess)
	 
* Currently, the entire set counts with [32] tiles (as of 15/11/24)
        
* Version "1.2" / Made by Zenodos (also "zenodos" at Discord and other social medias)

________________________________________________
— Content list

1. Installation
2. "Guide”
3. Folder structure
4. actual quick resume
5. Changelogs
________________
________________________________________________

— Installation
* Note: This guide only covers Rained so far, the method may vary for other level editors (Also do let me know how the installation works at other editors so that I can put them here, too)
   * You can also check tutorials and such on how to install custom tiles apart from using this guide anyway


* Rained: In order to install the tileset to the editor, all you have to do is to use the “Import Init.txt” button at the Assets category at the preferences
   
   * (The “Init” file being at, respectively, Disc Tubes\Medium for the “Medium” category of the set, and at Disc Tubes\Small for the “Small” category)

   * Once done, the categories should appear in the tile editor’s list
      * Namely as “Disc Tubes (Medium)” and “Disc Tubes (Small)”
	  
________________
________________________________________________


— ”Guide”
________________
* General stuff
        
* Most of these require to be surrounded by geometry, though they can be also used anywhere without needing them to be within adjacent geometry


* The layering for all of the tiles only reaches up to sublayer * 9 *, with 1-4 forming the frontal ring, and 6-9 forming the backward's
  

* Despite their similarity, the "Small" variant tiles are not exactly "compatible" with DiscPipe for transitioning either way (again, I've made these without even looking at DiscPipe's graphic sheet anyway)


* All of the tiles so far are also set to "Air" in their geometry's specs, this is to freely do anything with them

   * (On a note with it, if you'd need to have them placed on solid geometry, remember to use the "Force tile placement" key instead of the geometry's, usually set to "F" in most leditors)
________________
* Issues
        
* Currently these don't support "extreme" camera angles that much since it breaks their parallaxing (I hope I can fix this, tbh)


* [Insert other possible issue here]

* If you encounter any issues regarding the parallaxing/visuals and such I'd appreciate to be let known of it, either at Rain World (the community discord server, preferably at #modding-design), or via DM 
   * (may not respond as much)

* [Future issues go below]        
________________
* Note about some tiles
        
* The "Medium" category's curve tiles (for example DiscTubeM_CurveNE) are set to "Air" in their geo specs, optionally you can add slope geometry by where the outer "grating" part is at the curves
  
      * (This is optional, though)

   * (For a better visual 'representation' you can check "CurvesAndSlopes" at the "LeditorExamples" folder)

* The diagonal segments at the "Small" category (for example DiscTubeS_HDiag1) are buffertiles-operating tiles, you'd also need to place slopes on them but only by the parts that are diagonal

   * (If the text explanation isn't clear enough, you can go check the "SmallDiag" room file at "LeditorExamples")
________________
* Example room files
                
* The example rooms can be found at the "LeditorExamples" subfolder already mentioned above, so far it only includes example maps
(There may be more if necessary over time)
* It also contains the latest showcase room I did for these (the room file named "kelp"), plus few others as test showcasing

________________
________________________________________________

— Folder structure
        
* Normally most of the graphics will be in the main folders for their categories (like "Medium"), though the other additional subfolders in the categories' are only for backup

* You should only interact with the subfolders at the categories (like [Disc Tubes\Nedium\Curves] for example) if for whatever reasons one of the tiles' graphic image files went missing

* The "-compressed" folder is only used to store the zip files for previous versions of this tile pack, this doesn't have much use other than to regress "versions" of the pack (albeit not necessary yet)

* "LeditorExamples" contains level editor room files (as mentioned above), some as example rooms.

   * The same also has a "Levels" folder, where it stores the rendered room/settings files for said rooms

   * The "RoomScreenshots" subfolder of it is self explanatory (it contains screenshots of only few of the rooms)

      * These folders are optional, though, so they're not exactly vital to the tileset anyway

* Lastly, the "Small" and "Medium" are the categories' folders
   * For example, the "Small" folder contains the tile graphics and init file for the "Disc Tubes (Small)" category

________________________________________________
________________________________________________

— Something and actual quick resume
ctrl + c/v moment below
* If you encounter any issues regarding the parallaxing/visuals and such I'd appreciate to be let known of it, either at Rain World (the community discord server, preferably at #modding-design), or via DM 
   * (may not respond as much)

        Also, do let me know if this readme is poorly organized, lol.