BEGIN TRANSACTION;
DROP TABLE IF EXISTS "playlist_item_group";
CREATE TABLE IF NOT EXISTS "playlist_item_group" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"orderIndex"	INTEGER,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "song";
CREATE TABLE IF NOT EXISTS "song" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"path"	TEXT NOT NULL,
	"duration"	INTEGER,
	"orderIndex"	INTEGER,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "app_config";
CREATE TABLE IF NOT EXISTS "app_config" (
	"lastPlaylistId"	TEXT
);
DROP TABLE IF EXISTS "playlist_item";
CREATE TABLE IF NOT EXISTS "playlist_item" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"songId"	TEXT NOT NULL,
	"playlistItemGroupId"	TEXT NOT NULL,
	"playlistId"	TEXT NOT NULL,
	"orderIndex"	INTEGER,
	CONSTRAINT "FK_song_playlist" FOREIGN KEY("playlistId") REFERENCES "playlist"("id"),
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "playlist";
CREATE TABLE IF NOT EXISTS "playlist" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"created"	INTEGER,
	"lastItemPlayedId"	TEXT,
	"songs_folder"	TEXT,
	"lastItemGroupPlayedId"	TEXT,
	"lastItemPlayedPositionInSong"	INTEGER,
	PRIMARY KEY("id")
);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('1','Lijst',0);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('2','Groep 1',1);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('3','Groep 2',2);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('4','Groep 3',3);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('5','Groep 4',4);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('6','Groep 5',5);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('7','Groep 6',6);
INSERT INTO "playlist_item_group" ("id","name","orderIndex") VALUES ('8','Groep 7',7);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('1','Vogel','00 aaaDe vogel.mp3',232.489812,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('2','Alle kanten oet','00 aaalle kanten oet.mp3',227.246938,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('3','Alles of niets','00 aaAlles Of Niets.mp3',224.849187,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('4','Aparte doender','00 aaaparte doender.mp3',256.217,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('5','Automaat','00 aaAutomaat.mp3',243.718437,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('6','Bloome','00 aaBloome.mp3',262.974694,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('7','Bring de koorts teruuk','00 aaBring de koorts teruuk.mp3',304.587755,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('8','Call and the answer','00 aacall and the answer.mp3',237.879,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('9','Curacao','00 aacuracao.mp3',244.566375,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('10','Vogel','00 aacvoogel.mp3',232.489812,'');
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('11','Deil','00 aadewil.mp3',214.841187,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('12','De wandelende vis','00 aadewjandelende vis.mp3',243.696327,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('13','Doender','00 aadewkdoender.mp3',251.689796,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('14','Dromer in je nest','00 aadromer In Je Nest.mp3',201.862063,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('15','Druimer','00 aaeDruimer.mp3',221.022063,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('16','Elly','00 aaelly.mp3',246.264312,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('17','Fiets nao Mestreech','00 aafiets nao Mestreech.mp3',258.82925,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('18','Ginnen daag gin oer','00 aaGinnen daag gin oer.mp3',229.25375,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('19','Grenzeloos gezeur','00 aaGrenzeloos-Gezeur.mp3',180.558367,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('20','Happy met mijn app','00 aaHappy met mijn app.mp3',308.822563,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('21','Koorts','00 aakoorts.mp3',346.697125,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('22','Kortjakje','00 aaKortjakje Oma''s tarantella.mp3',116.194625,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('23','Laatste keer','00 aaLaatste Keer.mp3',208.768625,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('24','Letste kier','00 aaletstekier.mp3',303.132875,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('25','Vrolijke violen','00 aalimburgse vrolijke violen.mp3',271.856327,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('26','Marjolein','00 aamarjolein simons lamain bongers smits megens.mp3',189.96,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('27','Meisje loos','00 aameisje loos.mp3',215.335375,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('28','Mijn liefste kind','00 aaM''n Liefste Kind.mp3',234.831125,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('29','Vogel','00 aamot vogel.mp3',232.489812,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('30','Mot weg','00 aaMot weg.mp3',207.830375,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('31','Netwerk','00 aanetwerk.mp3',310.569813,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('32','Niet geschoten','00 aaNiet Geschoten.mp3',231.6515,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('33','Nieuwe papa','00 aaNieuwe LPapa.mp3',182.914625,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('34','Nieuwe marjolein','00 aanieuwe marjolein.mp3',187.279812,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('35','Oetgeprodeceerd','00 aaoetgeprocedeerd.mp3',232.69875,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('36','Op de fiets nao Maastrich','00 aaop de fiets nao mestreech luiaartsgild.mp3',265.665306,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('37','Oude marjolein','00 aaoude marjolein.mp3',184.920816,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('38','Roze rozen','00 aarozerozen.mp3',191.451429,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('39','Ruimte','00 aaruumte.mp3',232.620438,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('40','Samen sterk','00 aasamesterk.mp3',240.222041,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('41','Vogel','00 aasbVogel.mp3',231.807875,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('42','Stel nou die plannen bij','00 aaStel nou die plannen bij.mp3',183.59225,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('43','Taege de straum','00 aataege de straum.mp3',262.900438,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('44','Three score and ten','00 aathree score and ten.mp3',213.245563,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('45','Tied','00 aatied.mp3',273.222688,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('46','Toon je vuur','00 aaToon Je Vuur.mp3',176.92025,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('47','Vallen en weer staan','00 aaVallen en weer staan.mp3',252.840312,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('48','Vogel','00 aaVogel.mp3',232.497813,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('49','Vrolijke crisis','00 aaVrolijke Crisis.mp3',257.427312,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('50','Vrolijke violen','00 aavrolijke violen.mp3',275.017143,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('51','Netwerk','00 aawhnetwerk.mp3',310.569813,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('52','Willemien','00 aawillemien.mp3',257.679812,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('53','Wind van vrijheid','00 aawind van vrijheid .mp3',184.9475,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('54','Zeker neet doen','00 aazeker neet doon.mp3',316.954063,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('55','Zoute zee','00 aazoute zee.mp3',284.638188,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('56','Zwanenzang','00 aazwanenzang.mp3',193.939063,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('57','Vogel','00 KAbDe voogel.mp3',232.489812,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('58','Tegen de stroom','00 KAcaktegen de stroom.mp3',263.661875,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('59','Call and the answer','00 KAcall and the answer.mp3',237.879,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('60','Tied','00 KAeTied.mp3',273.222688,NULL);
INSERT INTO "song" ("id","name","path","duration","orderIndex") VALUES ('61','Fiets nao Mestrich','00 KAfiets nao mestreech.mp3',258.82925,NULL);
INSERT INTO "app_config" ("lastPlaylistId") VALUES ('1');
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('1','undefined','1','1','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('2','undefined','2','1','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('3','undefined','3','1','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('4','undefined','4','1','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('5','undefined','5','1','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('6','undefined','6','1','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('7','undefined','7','1','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('8','undefined','8','1','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('9','undefined','9','1','1',8);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('10','','10','1','1',9);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('11','','11','1','1',10);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('12','','12','1','1',11);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('13','','13','1','1',12);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('14','null','14','1','1',13);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('15','','15','1','1',14);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('16','','16','1','1',15);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('17','','17','1','1',16);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('18','','18','1','1',17);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('19','','19','1','1',18);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('20','','20','1','1',19);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('21','null','21','1','1',20);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('22','null','22','1','1',21);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('23','undefined','23','1','1',22);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('24','undefined','24','1','1',23);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('25','undefined','25','1','1',24);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('26','undefined','26','1','1',25);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('27','undefined','27','1','1',26);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('28','undefined','28','1','1',27);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('29','undefined','29','1','1',28);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('30','undefined','30','1','1',29);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('31','undefined','31','1','1',30);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('32','','32','1','1',31);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('33','','33','1','1',32);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('34','','34','1','1',33);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('35','','35','1','1',34);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('36','null','36','1','1',35);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('37','','37','1','1',36);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('38','','38','1','1',37);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('39','','39','1','1',38);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('40','','40','1','1',39);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('41','','41','1','1',40);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('42','','42','1','1',41);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('43','null','43','1','1',42);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('44','null','44','1','1',43);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('45','undefined','45','1','1',44);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('46','undefined','46','1','1',45);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('47','null','47','1','1',46);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('48','null','48','1','1',47);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('49','null','49','1','1',48);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('50','null','50','1','1',49);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('51','null','51','1','1',50);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('52','null','52','1','1',51);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('53','null','53','1','1',52);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('54','null','54','1','1',53);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('55','null','55','1','1',54);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('56','null','56','1','1',55);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('57','null','57','1','1',56);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('58','null','58','1','1',57);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('59','null','59','1','1',58);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('60','null','60','1','1',59);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('61','null','61','1','1',60);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('62','null','1','2','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('63','null','19','2','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('64','null','13','2','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('65','null','39','2','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('66','null','58','2','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('67','null','3','2','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('68','null','53','2','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('69','null','5','2','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('70','null','55','2','1',8);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('71','null','6','2','1',9);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('72','null','37','3','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('73','null','1','3','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('74','null','2','3','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('75','null','47','3','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('76','null','21','3','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('77','null','27','3','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('78','null','11','3','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('79','null','38','3','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('80','null','50','3','1',8);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('81','null','35','4','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('82','null','15','4','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('83','null','1','4','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('84','null','9','4','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('85','null','18','4','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('86','null','56','4','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('87','null','30','4','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('88','null','54','4','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('89','null','8','4','1',8);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('90','null','34','5','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('91','null','20','5','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('92','null','44','5','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('93','null','1','5','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('94','null','22','5','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('95','null','45','5','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('96','null','52','5','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('97','null','42','5','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('98','null','14','5','1',8);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('99','null','53','6','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('100','null','39','6','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('101','null','28','6','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('102','null','49','6','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('103','null','1','6','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('104','null','51','6','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('105','null','61','6','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('106','null','47','6','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('107','null','12','7','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('108','null','37','7','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('109','null','18','7','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('110','null','21','7','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('111','null','43','7','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('112','null','1','7','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('113','null','5','7','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('114','null','33','7','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('115','null','34','7','1',8);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('116','null','40','8','1',0);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('117','null','20','8','1',1);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('118','null','34','8','1',2);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('119','null','43','8','1',3);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('120','null','46','8','1',4);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('121','null','47','8','1',5);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('122','null','1','8','1',6);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('123','null','13','8','1',7);
INSERT INTO "playlist_item" ("id","name","songId","playlistItemGroupId","playlistId","orderIndex") VALUES ('124','null','39','8','1',8);
INSERT INTO "playlist" ("id","name","created","lastItemPlayedId","songs_folder","lastItemGroupPlayedId","lastItemPlayedPositionInSong") VALUES ('1','pieterlijst',1688894337834,'1','{{musicpath}}','1',0);
COMMIT;
